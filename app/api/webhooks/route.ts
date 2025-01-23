// app/api/webhooks/route.ts
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { Webhook } from 'coinbase-commerce-node';
import stripe from '@/lib/stripe';  // You'll need to create this
import { supabase } from '@/lib/utils';

// Helper function to get raw body from request
async function getRawBody(req: Request): Promise<string> {
    const arrayBuffer = await req.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);
    return new TextDecoder().decode(uint8Array);
}

// Helper function to update transaction status
async function updateTransactionStatus(chargeId: string, status: string, payoutStatus: string | null = null) {
    try {
        const updateData: any = {
            status: status,
            confirmed_at: status === 'confirmed' ? new Date() : null,
        };

        if (payoutStatus) {
            updateData.payout_status = payoutStatus;
            updateData.payout_completed_at = new Date();
        }

        const { data, error } = await supabase
            .from('transactions')
            .update(updateData)
            .eq('charge_id', chargeId);

        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error updating transaction:', error);
        throw error;
    }
}

export async function POST(req: Request) {
    try {
        // Get raw body and signature
        const rawBody = await getRawBody(req);
        const headersList = headers();
        const signature = headersList.get('x-cc-webhook-signature');

        if (!signature) {
            return NextResponse.json(
                { error: 'No signature provided' }, 
                { status: 401 }
            );
        }

        // Verify webhook
        const event = Webhook.verifyEventBody(
            rawBody,
            signature,
            process.env.COINBASE_WEBHOOK_SECRET!
        );

        if (event.type === "charge:confirmed") {
            console.log("Charge confirmed!");
            const amount = event.data.pricing.local.amount;
            const merchant_id = event.data.metadata.merchant_id;
            const chargeId = event.data.id;

            // Update transaction status
            await updateTransactionStatus(chargeId, 'confirmed');

            // Calculate amount with 2% fee and convert to cents
            const amountStripe = Math.round(amount * 100 * 0.98);
            
            // Send money to merchant
            await stripe.transfers.create({
                amount: amountStripe,
                currency: 'usd',
                destination: merchant_id,
            });

            // Update payout status
            await updateTransactionStatus(chargeId, 'confirmed', 'completed');
        }

        return NextResponse.json({ received: true });
    } catch (error) {
        console.error('Webhook error:', error);
        return NextResponse.json(
            { error: 'Webhook processing failed' }, 
            { status: 500 }
        );
    }
}
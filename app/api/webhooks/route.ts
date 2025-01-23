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

// Notify merchant
async function notifyMerchant(merchantId: string, chargeData: any) {
    try {
        // Get merchant's webhook URL
        const { data: merchant, error } = await supabase
            .from('merchants')
            .select('webhook_url')
            .eq('merchant_id', merchantId)
            .single();

        if (error || !merchant?.webhook_url) {
            console.log('No webhook URL found for merchant:', merchantId);
            return;
        }

        // Send notification to merchant
        const response = await fetch(merchant.webhook_url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                event_type: 'payment.confirmed',
                data: {
                    charge_id: chargeData.id,
                    amount: chargeData.pricing.local.amount,
                    currency: chargeData.pricing.local.currency,
                    crypto_amount: chargeData.pricing.settlement.amount,
                    crypto_currency: chargeData.pricing.settlement.currency,
                    customer_email: chargeData.timeline[0]?.email || null,
                    metadata: chargeData.metadata
                }
            })
        });

        if (!response.ok) {
            throw new Error(`Failed to notify merchant: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error notifying merchant:', error);
    }
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

            // Notify merchant
            await notifyMerchant(merchant_id, event.data);

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
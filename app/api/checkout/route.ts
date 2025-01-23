// app/api/checkout/route.ts
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { verifyApiKey, storeTransaction } from '@/lib/utils';
import { Client, resources } from 'coinbase-commerce-node';

// Initialize Coinbase client
Client.init(process.env.COINBASE_API_KEY!);

export async function POST(req: Request) {
    try {
        // Verify API key
        const headersList = headers();
        const apiKey = headersList.get('x-api-key');
        const merchantId = await verifyApiKey(apiKey);
        
        if (!merchantId) {
            return NextResponse.json({ error: 'Invalid API key' }, { status: 401 });
        }

        // Get request body
        const { amount, currency } = await req.json();

        // Create Coinbase charge with 0.5% markup
        const charge = await resources.Charge.create({
            name: "Order",
            description: "Crypto Payment",
            local_price: {
                amount: amount * 1.005,
                currency: currency,
            },
            pricing_type: "fixed_price",
            metadata: {
                user_id: "123",
                merchant_id: merchantId,
            }
        });

        // Store transaction
        await storeTransaction(charge);

        return NextResponse.json({ charge });
    } catch (error) {
        console.error('Checkout error:', error);
        return NextResponse.json(
            { error: 'Failed to create checkout' }, 
            { status: 500 }
        );
    }
}
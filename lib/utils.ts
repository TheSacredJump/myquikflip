import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { createClient } from '@supabase/supabase-js';
import { resources } from 'coinbase-commerce-node';


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// lib/utils.ts
// Initialize Supabase client
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Helper function to store transaction in Supabase
export async function storeTransaction(chargeData: any, status = 'pending') {
    try {
        const { data, error } = await supabase
            .from('transactions')
            .insert([{
                charge_id: chargeData.id,
                merchant_id: chargeData.metadata.merchant_id,
                amount_crypto: chargeData.pricing.settlement.amount,
                amount_usd: chargeData.pricing.local.amount,
                crypto_currency: chargeData.pricing.settlement.currency,
                status: status,
                customer_email: chargeData.timeline[0]?.email || null,
                payout_status: 'pending'
            }]);

        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error storing transaction:', error);
        throw error;
    }
}

// Verify API key function
export async function verifyApiKey(apiKey: string | null) {
    if (!apiKey) {
        return null;
    }

    try {
        const { data: keyData, error } = await supabase
            .from('api_keys')
            .select('merchant_id, last_used_at')
            .eq('key_value', apiKey)
            .eq('is_active', true)
            .single();

        if (error || !keyData) {
            return null;
        }

        // Update last used timestamp
        await supabase
            .from('api_keys')
            .update({ last_used_at: new Date().toISOString() })
            .eq('key_value', apiKey);

        return keyData.merchant_id;
    } catch (error) {
        console.error('Error verifying API key:', error);
        return null;
    }
}

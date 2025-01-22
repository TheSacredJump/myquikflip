// lib/stripe.ts
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_API_SECRET!, {
    apiVersion: '2024-12-18.acacia'  // Use latest version
});

export default stripe;
// lib/stripe.ts
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_API_SECRET!, {
    apiVersion: '2023-10-16'  // Use latest version
});

export default stripe;
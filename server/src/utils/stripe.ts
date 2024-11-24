import Stripe from 'stripe';

// Ensure process.env.STRIPE_SECRET_KEY is defined as a string
const stripeSecretKey: string = process.env.STRIPE_SECRET_KEY || '';

if (!stripeSecretKey) {
    throw new Error("STRIPE_SECRET_KEY is not defined in the environment variables");
}

const stripe = new Stripe(stripeSecretKey, {
    apiVersion: '2024-06-20', // Use the appropriate version
});

export default stripe;
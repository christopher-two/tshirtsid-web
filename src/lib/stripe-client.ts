
import { Stripe, loadStripe } from '@stripe/stripe-js';

let stripePromise: Promise<Stripe | null>;

export const getStripe = () => {
  if (!stripePromise) {
    const publicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    if (publicKey) {
      stripePromise = loadStripe(publicKey);
    } else {
        console.warn("Stripe publishable key is not set. Please set NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY environment variable.");
        stripePromise = Promise.resolve(null);
    }
  }
  return stripePromise;
};

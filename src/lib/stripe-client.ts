
import { Stripe, loadStripe } from '@stripe/stripe-js';

let stripePromise: Promise<Stripe | null>;

export const getStripe = () => {
  if (!stripePromise) {
    const publicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    if (publicKey) {
      stripePromise = loadStripe(publicKey);
    } else {
        console.warn("La clave publicable de Stripe no está configurada. Por favor, establece la variable de entorno NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY.");
        stripePromise = Promise.resolve(null);
    }
  }
  return stripePromise;
};

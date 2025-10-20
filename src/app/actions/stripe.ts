'use server';

import { CartItem } from '@/lib/types';
import { headers } from 'next/headers';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-06-20',
});

export async function createCheckoutSession(cartItems: CartItem[]): Promise<{ sessionId: string }> {
  const host = headers().get('host');
  const origin = headers().get('origin');

  if (!origin) {
    throw new Error('No se pudo determinar el origen de la solicitud.');
  }

  const line_items = cartItems.map((item) => ({
    price_data: {
      currency: 'usd',
      product_data: {
        name: `${item.name} (Talla: ${item.size})`,
        images: [`${origin}/placeholder-images/${item.imageId}.jpg`], // Assuming images are accessible
      },
      unit_amount: Math.round(item.price * 100), // Price in cents
    },
    quantity: item.quantity,
  }));

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cart`,
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'MX'],
      },
    });

    if (!session.id) {
        throw new Error("No se pudo crear la sesión de Stripe.");
    }

    return { sessionId: session.id };
  } catch (error) {
    console.error('Error al crear la sesión de checkout de Stripe:', error);
    // You might want to cast the error to Stripe.errors.StripeError to access more details
    if (error instanceof Stripe.errors.StripeError) {
        throw new Error(`Error de Stripe: ${error.message}`);
    }
    throw new Error('Ocurrió un error inesperado al procesar el pago.');
  }
}

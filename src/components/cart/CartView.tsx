"use client";

import { useCart } from "@/context/CartContext";
import { CartItemCard } from "./CartItemCard";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { ShoppingBag } from "lucide-react";
import { createCheckoutSession } from "@/app/actions/stripe";
import { getStripe } from "@/lib/stripe-client";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export function CartView() {
  const { cartItems } = useCart();
  const { toast } = useToast();
  const router = useRouter();

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-16 border-2 border-dashed border-foreground">
        <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground" />
        <h2 className="mt-4 text-xl font-semibold uppercase">Tu carrito está vacío</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Parece que aún no has añadido nada a tu carrito.
        </p>
        <Button asChild className="mt-6 uppercase font-bold">
          <Link href="/">Empezar a Comprar</Link>
        </Button>
      </div>
    );
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    try {
      const { sessionId } = await createCheckoutSession(cartItems);
      const stripe = await getStripe();
      if (!stripe) {
        throw new Error("Stripe.js no se ha cargado.");
      }
      
      const result = await stripe.redirectToCheckout({ sessionId });
      
      if (result.error) {
        console.error("Error al redirigir a Stripe:", result.error);
        toast({
          title: "Error de Pago",
          description: result.error.message || "Hubo un problema al redirigir a la página de pago.",
          variant: "destructive",
        });
      }
    } catch (err: any) {
      console.error("Error al crear la sesión de checkout:", err);
       toast({
        title: "Error del Servidor",
        description: err.message || "No se pudo iniciar el proceso de pago. Por favor, inténtalo de nuevo.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-4">
        {cartItems.map(item => (
          <CartItemCard key={`${item.id}-${item.size}`} item={item} />
        ))}
      </div>
      <div className="lg:col-span-1">
        <Card className="sticky top-24 border-2 border-foreground">
          <CardHeader>
            <CardTitle className="uppercase">Resumen del Pedido</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="uppercase">Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="uppercase">Envío</span>
              <span className="font-medium text-primary">Gratis</span>
            </div>
            <Separator />
            <div className="flex justify-between font-bold text-lg">
              <span className="uppercase">Total</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button className="w-full uppercase font-bold" size="lg" onClick={handleCheckout}>Proceder al Pago</Button>
            <Button asChild variant="outline" className="w-full uppercase">
              <Link href="/">Seguir Comprando</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

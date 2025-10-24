"use client";

import { useCart } from "@/context/CartContext";
import { CartItemCard } from "./CartItemCard";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { MessageCircle, ShoppingBag } from "lucide-react";

export function CartView() {
  const { cartItems, clearCart } = useCart();

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

  const handleWhatsAppOrder = () => {
    // IMPORTANTE: Reemplaza con tu número de WhatsApp real, incluyendo el código de país sin el "+".
    const whatsappNumber = "6181137364";
    
    const intro = "¡Hola! 👋 Me gustaría hacer un pedido con los siguientes artículos de mi carrito:\n\n";
    
    const itemsText = cartItems.map(item => 
      `*Producto:* ${item.name}\n*Talla:* ${item.size}\n*Cantidad:* ${item.quantity}\n*Precio:* $${(item.price * item.quantity).toFixed(2)}`
    ).join('\n\n');
    
    const totalText = `\n\n*Total estimado:* $${subtotal.toFixed(2)}`;
    
    const message = intro + itemsText + totalText;
    
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
    
    // Opcional: limpiar el carrito después de enviar el pedido
    // clearCart();
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
              <span className="font-medium text-primary">A convenir</span>
            </div>
            <Separator />
            <div className="flex justify-between font-bold text-lg">
              <span className="uppercase">Total</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button className="w-full uppercase font-bold" size="lg" onClick={handleWhatsAppOrder}>
              <MessageCircle className="mr-2 h-5 w-5" />
              Pedir por WhatsApp
            </Button>
            <Button asChild variant="outline" className="w-full uppercase">
              <Link href="/">Seguir Comprando</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

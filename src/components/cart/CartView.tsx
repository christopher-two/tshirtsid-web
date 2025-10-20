"use client";

import { useCart } from "@/context/CartContext";
import { CartItemCard } from "./CartItemCard";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { ShoppingBag } from "lucide-react";

export function CartView() {
  const { cartItems } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-16 border-2 border-dashed rounded-lg">
        <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground" />
        <h2 className="mt-4 text-xl font-semibold">Your cart is empty</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Looks like you haven't added anything to your cart yet.
        </p>
        <Button asChild className="mt-6">
          <Link href="/">Start Shopping</Link>
        </Button>
      </div>
    );
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-4">
        {cartItems.map(item => (
          <CartItemCard key={`${item.id}-${item.size}`} item={item} />
        ))}
      </div>
      <div className="lg:col-span-1">
        <Card className="sticky top-24">
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="font-medium">Free</span>
            </div>
            <Separator />
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button className="w-full" size="lg">Proceed to Checkout</Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/">Continue Shopping</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

import { CartView } from "@/components/cart/CartView";

export default function CartPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tight font-headline">Tu Carrito de Compras</h1>
      <CartView />
    </div>
  );
}

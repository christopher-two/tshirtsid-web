import { CartView } from '@/components/cart/CartView';

export default function CartPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight font-headline mb-8 text-center uppercase">
        Tu Carrito de Compras
      </h1>
      <CartView />
    </div>
  );
}

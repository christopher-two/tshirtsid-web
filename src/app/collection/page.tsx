import { products } from '@/lib/products';
import { ProductView } from '@/components/products/ProductView';

export default function CollectionPage() {
  return (
    <section id="products">
      <h2 className="text-3xl font-bold tracking-tight mb-4 font-headline">Nuestra Colección</h2>
      <p className="text-muted-foreground mb-8">
        Descubre tu próxima camiseta favorita de nuestra selección curada.
      </p>
      <ProductView allProducts={products} />
    </section>
  );
}

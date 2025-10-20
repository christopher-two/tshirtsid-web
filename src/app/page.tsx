import { products } from '@/lib/products';
import { ProductView } from '@/components/products/ProductView';

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-4 font-headline">Explore Our Collection</h1>
      <p className="text-muted-foreground mb-8">
        Discover your next favorite t-shirt from our curated selection.
      </p>
      <ProductView allProducts={products} />
    </div>
  );
}

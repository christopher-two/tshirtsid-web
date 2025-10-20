import type { Product } from '@/lib/types';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
        <div className="text-center py-16">
            <h2 className="text-2xl font-semibold mb-2">No Products Found</h2>
            <p className="text-muted-foreground">Try adjusting your filters.</p>
        </div>
    )
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

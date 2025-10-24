import type { TShirt } from '@/lib/types';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: TShirt[];
}

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
        <div className="text-center py-16">
            <h2 className="text-2xl font-semibold mb-2 uppercase">No se encontraron productos</h2>
            <p className="text-muted-foreground">Pronto tendremos nuevos productos en esta categoría.</p>
        </div>
    )
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-l-2 border-t-2 border-foreground">
      {products.map((product, index) => (
        <div key={product.id} className="border-r-2 border-b-2 border-foreground p-4">
            <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}

import Link from 'next/link';
import Image from 'next/image';
import type { TShirt } from '@/lib/types';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  product: TShirt;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.id}`} className="group block overflow-hidden">
        <div className="aspect-[3/4] relative bg-black">
          {product.imageUrl && (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105 group-hover:opacity-75"
              data-ai-hint={product.imageHint}
            />
          )}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col p-4 justify-end">
            <h3 className="text-lg font-bold uppercase tracking-wider text-white">{product.name}</h3>
            <Badge variant="secondary" className="bg-primary text-primary-foreground font-bold text-base mt-2 self-start">
              ${product.price.toFixed(2)}
            </Badge>
          </div>
        </div>
    </Link>
  );
}

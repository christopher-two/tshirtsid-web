import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const placeholder = PlaceHolderImages.find(p => p.id === product.imageId);

  return (
    <Link href={`/products/${product.id}`} className="group">
      <Card className="overflow-hidden h-full relative transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        <CardHeader className="p-0">
          <div className="aspect-[3/4] relative">
            {placeholder && (
              <Image
                src={placeholder.imageUrl}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                data-ai-hint={product.imageHint}
              />
            )}
          </div>
        </CardHeader>
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col p-4">
          <div className="mt-auto">
            <CardTitle className="text-lg font-headline leading-tight mb-2 text-white">{product.name}</CardTitle>
            <p className="text-sm text-gray-200 mb-4">{product.description}</p>
            <Badge variant="secondary" className="text-base font-semibold">
              ${product.price.toFixed(2)}
            </Badge>
          </div>
        </div>
      </Card>
    </Link>
  );
}

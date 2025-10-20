import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const placeholder = PlaceHolderImages.find(p => p.id === product.imageId);

  return (
    <Link href={`/products/${product.id}`} className="group">
      <Card className="overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        <CardHeader className="p-0">
          <div className="aspect-[3/4] relative">
            {placeholder && (
              <Image
                src={placeholder.imageUrl}
                alt={product.name}
                fill
                className="object-cover"
                data-ai-hint={product.imageHint}
              />
            )}
          </div>
        </CardHeader>
        <CardContent className="p-4 flex-grow">
          <CardTitle className="text-lg font-semibold font-headline leading-tight mb-1">{product.name}</CardTitle>
          <p className="text-sm text-muted-foreground">{product.description}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Badge variant="secondary" className="text-base font-semibold">
            ${product.price.toFixed(2)}
          </Badge>
        </CardFooter>
      </Card>
    </Link>
  );
}

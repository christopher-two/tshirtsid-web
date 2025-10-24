"use client";

import Image from 'next/image';
import type { TShirt } from '@/lib/types';
import { AddToCart } from './AddToCart';
import { PlaceHolderImages } from '@/lib/placeholder-images';

interface ProductDetailProps {
  product: TShirt;
}

export function ProductDetail({ product }: ProductDetailProps) {
  const placeholder = PlaceHolderImages.find(p => p.id === product.imageId);
  const imageUrl = placeholder?.imageUrl;

  return (
    <div className="space-y-8 p-4 md:p-0">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <div className="aspect-[3/4] relative bg-black border-2 border-foreground">
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              data-ai-hint={product.imageHint}
              priority
            />
          )}
        </div>
        <div className="flex flex-col justify-center">
          <div className="space-y-4">
            <h1 className="text-3xl lg:text-4xl font-bold font-headline uppercase">{product.name}</h1>
            <p className="text-3xl font-semibold text-primary">${product.price.toFixed(2)}</p>
            <p className="text-muted-foreground lg:text-lg">{product.longDescription}</p>
            <AddToCart product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}

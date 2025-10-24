"use client";

import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { WhatsAppButton } from '@/components/products/WhatsAppButton';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { doc } from 'firebase/firestore';
import type { TShirt } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const firestore = useFirestore();
  
  const productRef = useMemoFirebase(() => {
    if (!firestore) return null;
    return doc(firestore, 'tshirts', params.id);
  }, [firestore, params.id]);

  const { data: product, isLoading } = useDoc<TShirt>(productRef);

  if (isLoading) {
    return (
       <div className="space-y-8">
        <div>
            <Button asChild variant="ghost" className="-ml-4 uppercase">
              <Link href="/collection">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Volver a todos los productos
              </Link>
            </Button>
        </div>
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            <Skeleton className="aspect-[3/4]"/>
            <div className="flex flex-col justify-center space-y-4">
                <Skeleton className="h-10 w-3/4" />
                <Skeleton className="h-8 w-1/4" />
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-12 w-full" />
            </div>
        </div>
    </div>
    );
  }
  
  if (!product) {
    notFound();
  }

  const placeholder = PlaceHolderImages.find(p => p.id === product.imageId);

  return (
    <div className="space-y-8">
      <div>
        <Button asChild variant="ghost" className="-ml-4 uppercase">
          <Link href="/collection">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Volver a todos los productos
          </Link>
        </Button>
      </div>
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <div className="aspect-[3/4] relative bg-black border-2 border-foreground">
          {placeholder && (
            <Image
              src={placeholder.imageUrl}
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
            <WhatsAppButton product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}

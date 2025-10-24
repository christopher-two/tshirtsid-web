"use client";

import { useCollection, useFirestore } from '@/firebase';
import { ProductView } from '@/components/products/ProductView';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { collection } from 'firebase/firestore';
import type { TShirt } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

export default function CollectionPage() {
  const firestore = useFirestore();
  const { data: products, isLoading } = useCollection<TShirt>(collection(firestore, 'tshirts'));

  return (
    <section id="products">
        <div>
            <Button asChild variant="ghost" className="-ml-4 uppercase">
              <Link href="/">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Volver
              </Link>
            </Button>
        </div>
      <h2 className="text-3xl font-bold tracking-tight mb-4 font-headline text-center my-8">Nuestra Colección</h2>
      {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <Skeleton className="aspect-[3/4]" />
            <Skeleton className="aspect-[3/4]" />
            <Skeleton className="aspect-[3/4]" />
          </div>
        ) : (
          <ProductView allProducts={products || []} />
        )}
    </section>
  );
}

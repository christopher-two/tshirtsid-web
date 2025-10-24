"use client";

import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { notFound, useParams } from 'next/navigation';
import { doc } from 'firebase/firestore';
import type { TShirt } from '@/lib/types';
import { ProductDetail } from '@/components/products/ProductDetail';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProductPage() {
  const firestore = useFirestore();
  const params = useParams();
  const productId = Array.isArray(params.id) ? params.id[0] : params.id;
  
  const productRef = useMemoFirebase(() => {
    if (!firestore || !productId) return null;
    return doc(firestore, 'tshirts', productId);
  }, [firestore, productId]);

  const { data: product, isLoading } = useDoc<TShirt>(productRef);
  
  if (isLoading) {
    return (
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
    );
  }

  if (!product && !isLoading) {
    notFound();
  }

  return product ? <ProductDetail product={product} /> : null;
}

"use client";

import { useCollection, useFirestore } from '@/firebase';
import { ProductView } from '@/components/products/ProductView';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { collection, query, where } from 'firebase/firestore';
import type { TShirt } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

interface CategoryPageProps {
    params: {
        category: string;
    }
}

const validCategories = ['men', 'women', 'kids'];

export default function CategoryPage({ params }: CategoryPageProps) {
  const { category } = params;
  const firestore = useFirestore();
  
  const productsCollection = collection(firestore, 'tshirts');
  const productsQuery = query(productsCollection, where('category', '==', category));
  const { data: filteredProducts, isLoading } = useCollection<TShirt>(productsQuery);

  if (!validCategories.includes(category)) {
    notFound();
  }
  
  const categoryTitles = {
    men: 'Hombres',
    women: 'Mujeres',
    kids: 'Niños'
  }

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
      <h2 className="text-3xl font-bold tracking-tight mb-4 font-headline text-center my-8">
        Colección de {categoryTitles[category as keyof typeof categoryTitles]}
      </h2>
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <Skeleton className="aspect-[3/4]" />
            <Skeleton className="aspect-[3/4]" />
            <Skeleton className="aspect-[3_4]" />
        </div>
        ) : (
        <ProductView allProducts={filteredProducts || []} />
        )}
    </section>
  );
}

import { tshirts } from '@/lib/tshirts';
import { ProductView } from '@/components/products/ProductView';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default function CollectionPage() {
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
      <ProductView allProducts={tshirts} />
    </section>
  );
}

import { tshirts } from '@/lib/tshirts';
import { ProductView } from '@/components/products/ProductView';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

interface CategoryPageProps {
    params: {
        category: string;
    }
}

const validCategories = ['men', 'women', 'kids'];

export default function CategoryPage({ params }: CategoryPageProps) {
  const { category } = params;

  if (!validCategories.includes(category)) {
    notFound();
  }

  const filteredProducts = tshirts.filter(p => p.category === category);
  
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
      <ProductView allProducts={filteredProducts} />
    </section>
  );
}

export async function generateStaticParams() {
    return validCategories.map(category => ({
        category,
    }))
}

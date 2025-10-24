import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { products } from '@/lib/products';
import { ProductCard } from '@/components/products/ProductCard';
import { FeaturesSection } from '@/components/layout/FeaturesSection';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  const featuredProducts = products.slice(0, 3);

  return (
    <div className="space-y-16">
      <section className="relative min-h-[60vh] flex items-center justify-center text-foreground border-b-2 border-primary">
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 text-center z-10">
          <h1 className="text-4xl md:text-7xl font-bold tracking-tighter font-headline uppercase">
            Estilo que <span className="text-primary">Define</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground">
            Explora los últimos diseños y encuentra tu nueva camiseta favorita. Innovación y estilo en cada hilo.
          </p>
          <Button asChild size="lg" className="mt-8 uppercase font-bold group">
            <Link href="/collection">
              Ver Colección
              <ArrowRight className="transition-transform group-hover:translate-x-2" />
            </Link>
          </Button>
        </div>
      </section>

      <section>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight font-headline uppercase">Productos Destacados</h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            Una selección de nuestros diseños más populares y queridos por la comunidad.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 border-2 border-foreground">
          {featuredProducts.map((product, index) => (
             <div key={product.id} className={`p-4 ${index < 2 ? 'sm:border-r-2 border-foreground' : ''} border-b-2 sm:border-b-0 border-foreground`}>
                <ProductCard product={product} />
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Button asChild size="lg" variant="outline" className="uppercase font-bold group">
            <Link href="/collection">Ver todos los productos <ArrowRight className="transition-transform group-hover:translate-x-2" /></Link>
          </Button>
        </div>
      </section>

      <FeaturesSection />

    </div>
  );
}

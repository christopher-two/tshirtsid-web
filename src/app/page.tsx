import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { products } from '@/lib/products';
import { ProductCard } from '@/components/products/ProductCard';
import { FeaturesSection } from '@/components/layout/FeaturesSection';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  const featuredProducts = products.slice(0, 3);

  const categories = [
    {
      name: 'Mujer',
      href: '/collection/women',
      imageSrc: 'https://images.unsplash.com/photo-1572804013427-4d7ca726b65a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
      imageHint: 'woman fashion',
      subImageSrc: 'https://images.unsplash.com/photo-1509395043312-9c1622ed307f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
      subImageHint: 'woman portrait',
    },
    {
      name: 'Hombre',
      href: '/collection/men',
      imageSrc: 'https://images.unsplash.com/photo-1512303500393-2b2f6f5b2da7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
      imageHint: 'man fashion',
      subImageSrc: 'https://images.unsplash.com/photo-1593452506440-78155b5f257e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
      subImageHint: 'man portrait',
    },
  ];

  return (
    <div className="space-y-16">
      <section className="min-h-screen -my-8 -mx-8">
        <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-1 md:grid-rows-[auto_1fr] h-full">
          <div className="md:col-span-2 grid grid-cols-2 grid-rows-2">
            
            {/* Top row */}
            <div className="relative aspect-square">
              <Image src="https://images.unsplash.com/photo-1572804013427-4d7ca726b65a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt="Woman" fill className="object-cover" />
            </div>
            <div className="relative aspect-square">
              <Image src="https://images.unsplash.com/photo-1512303500393-2b2f6f5b2da7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt="Man" fill className="object-cover" />
            </div>

            {/* Bottom row */}
            <div className="relative aspect-square group">
               <Link href="/collection/women">
                <Image src="https://images.unsplash.com/photo-1509395043312-9c1622ed307f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt="Mujer" fill className="object-cover group-hover:opacity-75 transition-opacity" />
                <div className="absolute inset-0 flex items-end p-6 bg-gradient-to-t from-black/60 to-transparent">
                  <h2 className="text-5xl md:text-7xl font-black text-white uppercase">Mujer</h2>
                </div>
               </Link>
            </div>
             <div className="relative aspect-square group">
               <Link href="/collection/men">
                <Image src="https://images.unsplash.com/photo-1593452506440-78155b5f257e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt="Hombre" fill className="object-cover group-hover:opacity-75 transition-opacity" />
                <div className="absolute inset-0 flex items-end p-6 bg-gradient-to-t from-black/60 to-transparent">
                  <h2 className="text-5xl md:text-7xl font-black text-white uppercase">Hombre</h2>
                </div>
               </Link>
            </div>
          </div>

          <div className="relative md:row-span-2 group">
             <Link href="/collection/kids">
              <Image src="https://images.unsplash.com/photo-1513224729462-475246ba1136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt="Kids" fill className="object-cover h-full group-hover:opacity-75 transition-opacity" />
              <div className="absolute inset-0 flex items-end p-6 bg-gradient-to-t from-black/60 to-transparent">
                <h2 className="text-5xl md:text-7xl font-black text-white uppercase">Kids</h2>
              </div>
             </Link>
          </div>
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

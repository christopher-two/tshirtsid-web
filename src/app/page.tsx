import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { products } from '@/lib/products';
import { ProductCard } from '@/components/products/ProductCard';

export default function Home() {
  const featuredProducts = products.slice(0, 3);

  return (
    <div className="space-y-16">
      <section className="relative h-[60vh] flex items-center justify-center text-white rounded-lg overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1581012771563-0433d7b8a74e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHx0c2hpcnQlMjBzdG9yZSUyMHN0b3JlfGVufDB8fHx8MTc2MDk3OTY5N3ww&ixlib=rb-4.1.0&q=80&w=1920"
          alt="Promotional banner"
          fill
          className="object-cover object-center"
          data-ai-hint="tshirt store"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight font-headline">Nuevas Colecciones</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-gray-200">
            Explora los últimos diseños y encuentra tu nueva camiseta favorita. Innovación y estilo en cada hilo.
          </p>
          <Button asChild size="lg" className="mt-8">
            <Link href="/collection">Ver Colección</Link>
          </Button>
        </div>
      </section>

      <section>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight font-headline">Productos Destacados</h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            Una selección de nuestros diseños más populares y queridos por la comunidad.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="text-center mt-12">
          <Button asChild size="lg" variant="outline">
            <Link href="/collection">Ver todos los productos</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

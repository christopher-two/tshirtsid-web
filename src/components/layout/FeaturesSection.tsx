import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Shirt, Droplets, Leaf } from 'lucide-react';

const features = [
  {
    icon: <Shirt className="w-10 h-10 text-primary" />,
    title: 'Diseños Únicos y Exclusivos',
    description: 'Cada camiseta cuenta una historia. Nuestros diseños son creados por una comunidad de artistas independientes, asegurando que vistas una prenda original y con significado que no encontrarás en ningún otro lugar.',
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    imageHint: 'artist designing tshirt',
    align: 'left',
  },
  {
    icon: <Leaf className="w-10 h-10 text-primary" />,
    title: 'Calidad Premium y Sostenible',
    description: 'Utilizamos solo algodón 100% orgánico, cultivado de forma responsable. Nuestras camisetas son suaves al tacto, transpirables y están hechas para durar, reduciendo el impacto en el planeta.',
    imageUrl: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    imageHint: 'stack of folded tshirts',
    align: 'right',
  },
  {
    icon: <Droplets className="w-10 h-10 text-primary" />,
    title: 'Impresión Ecológica',
    description: 'Comprometidos con el medio ambiente, nuestras tintas son a base de agua y libres de químicos dañinos. Esto garantiza una impresión de alta calidad que es segura para tu piel y para el planeta.',
    imageUrl: 'https://images.unsplash.com/photo-1558280625-5d43c7425b4d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    imageHint: 'screen printing process',
    align: 'left',
  },
];

export function FeaturesSection() {
  return (
    <section className="py-16 sm:py-24 space-y-16 overflow-hidden">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight font-headline uppercase">Pasión por lo que Hacemos</h2>
        <p className="mt-4 max-w-3xl mx-auto text-muted-foreground">
          No solo vendemos camisetas, creamos piezas de arte que puedes vestir. Descubre la calidad y la creatividad que nos definen.
        </p>
      </div>
      <div className="space-y-8">
        {features.map((feature, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-5 items-center gap-8 md:gap-12 border-2 border-foreground p-8">
            <div className={`md:col-span-2 ${feature.align === 'left' ? 'md:order-1' : 'md:order-2'}`}>
              <div className="relative aspect-video">
                <Image
                  src={feature.imageUrl}
                  alt={feature.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 40vw"
                  data-ai-hint={feature.imageHint}
                />
                 <div className="absolute inset-0 bg-primary/20"></div>
              </div>
            </div>
            <div className={`md:col-span-3 ${feature.align === 'left' ? 'md:order-2' : 'md:order-1'}`}>
              <div className="space-y-4 text-center md:text-left">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-background border-2 border-primary mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold font-headline uppercase">{feature.title}</h3>
                <p className="text-muted-foreground text-lg">{feature.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';
import Link from 'next/link';

export default function ContactPage() {
  // Reemplaza con tu número de WhatsApp
  const whatsappNumber = "1234567890";
  const message = "Hola! Quisiera hacer una consulta sobre sus productos.";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="flex flex-col items-center justify-center text-center py-16 border-2 border-dashed border-foreground min-h-[50vh]">
      <MessageCircle className="mx-auto h-12 w-12 text-muted-foreground" />
      <h1 className="mt-4 text-3xl font-bold tracking-tight font-headline">Contáctanos</h1>
      <p className="mt-2 text-lg text-muted-foreground max-w-md">
        ¿Tienes alguna pregunta sobre nuestros productos, tallas o diseños? Estamos aquí para ayudarte.
      </p>
      <Button asChild className="mt-8 uppercase font-bold" size="lg">
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
          <MessageCircle className="mr-2 h-5 w-5" />
          Iniciar Chat por WhatsApp
        </a>
      </Button>
      <p className="mt-8 text-sm text-muted-foreground">
        O si lo prefieres, puedes seguir explorando nuestra colección.
      </p>
      <Button asChild variant="link" className="mt-2 text-primary">
          <Link href="/collection">Ver colección</Link>
      </Button>
    </div>
  );
}

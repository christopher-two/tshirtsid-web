"use client";

import Link from "next/link";
import { Instagram, Heart } from "lucide-react";
import { usePathname } from "next/navigation";


export function Footer() {
  const pathname = usePathname();

  if (pathname.startsWith('/admin')) {
      return null;
  }
  const footerLinks = {
    Colecciones: [
      { title: "Hombres", href: "/collection/men" },
      { title: "Mujeres", href: "/collection/women" },
      { title: "Niños", href: "/collection/kids" },
    ],
    Información: [
      { title: "Nuestra Colección", href: "/collection" },
      { title: "Contacto", href: "/cart" },
      { title: "Sobre Nosotros", href: "#" },
    ],
    Legal: [
      { title: "Política de Privacidad", href: "#" },
      { title: "Términos de Servicio", href: "#" },
      { title: "Política de Envíos", href: "#" },
    ],
  };

  return (
    <footer className="bg-background text-foreground border-t-2 border-foreground mt-16">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <h2 className="text-2xl font-bold font-headline uppercase tracking-wider">T-Shirt ID</h2>
             <div className="flex space-x-4 mt-4">
               <Link href="https://www.instagram.com/shirt4595/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                 <Instagram className="w-5 h-5" />
               </Link>
            </div>
          </div>
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-bold uppercase tracking-wider text-sm mb-4 text-muted-foreground">
                {category}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.title}>
                    <Link href={link.href} className="text-foreground hover:text-primary transition-colors">
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center">
          <div className="text-sm text-muted-foreground order-2 sm:order-1 mt-4 sm:mt-0 space-y-2 sm:space-y-0 text-center sm:text-left">
             <p>
                &copy; {new Date().getFullYear()} T-Shirt ID. Todos los derechos reservados.
             </p>
             <p>
                <Link href="/login" className="underline hover:text-primary">Admin</Link>
             </p>
          </div>
          <div className="flex items-center space-x-4 order-1 sm:order-2">
            <p className="text-sm text-muted-foreground flex items-center">
              Desarrollado con <Heart className="w-4 h-4 mx-1 text-primary fill-current" /> por&nbsp;
              <Link href="https://www.christopher.com.mx" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">
                ChristopherTwo
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

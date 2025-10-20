import Link from "next/link";
import { Twitter, Linkedin, Github, Heart } from "lucide-react";

export function Footer() {
  const footerLinks = {
    Producto: [
      { title: "Visión General", href: "#" },
      { title: "Capacidades", href: "#" },
      { title: "Precios", href: "#" },
    ],
    Recursos: [
      { title: "Documentación", href: "#" },
      { title: "Soporte", href: "#" },
      { title: "Comunidad", href: "#" },
    ],
    Empresa: [
      { title: "Acerca de", href: "#" },
      { title: "Carreras", href: "#" },
      { title: "Contacto", href: "#" },
    ],
    Legal: [
      { title: "Privacidad", href: "#" },
      { title: "Términos", href: "#" },
      { title: "Cookies", href: "#" },
    ],
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-1">
            <h2 className="text-2xl font-bold font-headline">T-Shirt ID Shop</h2>
          </div>
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-bold uppercase tracking-wider text-sm mb-4">
                {category}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.title}>
                    <Link href={link.href} className="text-gray-400 hover:text-white transition-colors">
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-gray-400 order-2 sm:order-1 mt-4 sm:mt-0">
            &copy; {new Date().getFullYear()} T-Shirt ID Shop. Todos los derechos reservados.
          </p>
          <div className="flex items-center space-x-4 order-1 sm:order-2">
            <p className="text-sm text-gray-400 flex items-center">
              Desarrollado con <Heart className="w-4 h-4 mx-1 text-red-500 fill-current" /> por&nbsp;
              <Link href="https://www.christopher.com.mx" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">
                ChristopherTwo
              </Link>
            </p>
            <div className="flex space-x-4">
               <Link href="#" className="text-gray-400 hover:text-white">
                 <Twitter className="w-5 h-5" />
               </Link>
               <Link href="#" className="text-gray-400 hover:text-white">
                 <Linkedin className="w-5 h-5" />
               </Link>
               <Link href="#" className="text-gray-400 hover:text-white">
                 <Github className="w-5 h-5" />
               </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

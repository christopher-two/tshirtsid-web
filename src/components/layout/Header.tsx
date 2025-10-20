"use client"

import Link from 'next/link';
import { Menu } from 'lucide-react';
import { CartIcon } from '@/components/cart/CartIcon';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from '../ui/button';
import { useState } from 'react';

const navLinks = [
    { href: '/', label: 'Inicio' },
    { href: '/collection', label: 'Colección' },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-card border-b sticky top-0 z-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 text-lg font-semibold font-headline">
              <span>T-Shirt ID Shop</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="text-sm font-medium hover:text-primary transition-colors">
                    {link.label}
                </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <CartIcon />
            <div className="md:hidden">
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <Menu className="h-6 w-6" />
                            <span className="sr-only">Abrir Menú</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right">
                        <div className="flex flex-col gap-6 pt-10">
                            {navLinks.map((link) => (
                                <Link key={link.href} href={link.href} className="text-lg font-medium hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

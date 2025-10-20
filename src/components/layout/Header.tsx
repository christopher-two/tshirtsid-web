import Link from 'next/link';
import { Shirt } from 'lucide-react';
import { CartIcon } from '@/components/cart/CartIcon';

export function Header() {
  return (
    <header className="bg-card border-b sticky top-0 z-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 text-lg font-semibold font-headline">
              <Shirt className="h-6 w-6" />
              <span>T-Shirt ID Shop</span>
            </Link>
          </div>
          <div className="flex items-center">
            <CartIcon />
          </div>
        </div>
      </div>
    </header>
  );
}

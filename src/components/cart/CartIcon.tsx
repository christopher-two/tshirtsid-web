"use client";

import { useCart } from '@/context/CartContext';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useEffect, useState } from 'react';

export function CartIcon() {
  const { cartItems } = useCart();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const itemCount = isClient ? cartItems.reduce((sum, item) => sum + item.quantity, 0) : 0;

  return (
    <Button asChild variant="ghost" size="icon">
      <Link href="/cart">
        <div className="relative">
          <ShoppingCart className="h-5 w-5" />
          {isClient && itemCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs"
            >
              {itemCount}
            </Badge>
          )}
        </div>
        <span className="sr-only">Shopping Cart</span>
      </Link>
    </Button>
  );
}

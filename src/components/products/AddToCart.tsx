"use client";

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import type { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ShoppingBag } from 'lucide-react';

interface AddToCartProps {
  product: Product;
}

export function AddToCart({ product }: AddToCartProps) {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<string | undefined>(product.sizes.length > 0 ? product.sizes[0] : undefined);
  const [error, setError] = useState<string | null>(null);

  const handleAddToCart = () => {
    if (!selectedSize) {
      setError('Por favor, selecciona una talla.');
      return;
    }
    setError(null);
    addToCart(product, selectedSize);
  };

  return (
    <div className="space-y-6 pt-4">
      <div>
        <Label className="text-base font-medium">Talla</Label>
        <RadioGroup
          value={selectedSize}
          onValueChange={setSelectedSize}
          className="flex flex-wrap gap-2 mt-2"
        >
          {product.sizes.map(size => (
            <div key={size}>
              <RadioGroupItem value={size} id={`size-${size}`} className="sr-only" />
              <Label
                htmlFor={`size-${size}`}
                className="flex items-center justify-center rounded-md border-2 p-3 text-sm font-medium uppercase hover:bg-accent focus:outline-none cursor-pointer data-[state=checked]:border-primary"
                data-state={selectedSize === size ? 'checked' : 'unchecked'}
              >
                {size}
              </Label>
            </div>
          ))}
        </RadioGroup>
        {error && <p className="text-sm font-medium text-destructive mt-2">{error}</p>}
      </div>
      <Button size="lg" className="w-full" onClick={handleAddToCart} disabled={!selectedSize}>
        <ShoppingBag className="mr-2 h-5 w-5" />
        Añadir al Carrito
      </Button>
    </div>
  );
}

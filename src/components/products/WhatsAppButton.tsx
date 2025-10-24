"use client";

import { useState } from 'react';
import type { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { MessageCircle } from 'lucide-react';

interface WhatsAppButtonProps {
  product: Product;
}

export function WhatsAppButton({ product }: WhatsAppButtonProps) {
  const [selectedSize, setSelectedSize] = useState<string | undefined>(product.sizes.length > 0 ? product.sizes[0] : undefined);
  const [error, setError] = useState<string | null>(null);

  const handleWhatsAppInquiry = () => {
    if (!selectedSize) {
      setError('Por favor, selecciona una talla.');
      return;
    }
    setError(null);
    
    // IMPORTANTE: Reemplaza "1234567890" con tu número de WhatsApp real, incluyendo el código de país sin el "+".
    const whatsappNumber = "1234567890";
    const productUrl = `${window.location.origin}/products/${product.id}`;
    
    const message = `Hola! Estoy interesado/a en la camiseta "${product.name}" en talla ${selectedSize}. ¿Podrían darme más información? \n\nEnlace al producto: ${productUrl}`;
    
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="space-y-6 pt-4">
      <div>
        <Label className="text-base font-medium uppercase">Talla</Label>
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
                className="flex items-center justify-center border-2 p-3 text-sm font-medium uppercase hover:bg-accent focus:outline-none cursor-pointer data-[state=checked]:border-primary data-[state=checked]:text-primary"
                data-state={selectedSize === size ? 'checked' : 'unchecked'}
              >
                {size}
              </Label>
            </div>
          ))}
        </RadioGroup>
        {error && <p className="text-sm font-medium text-destructive mt-2">{error}</p>}
      </div>
      <Button size="lg" className="w-full uppercase font-bold" onClick={handleWhatsAppInquiry} disabled={!selectedSize}>
        <MessageCircle className="mr-2 h-5 w-5" />
        Consultar por WhatsApp
      </Button>
    </div>
  );
}

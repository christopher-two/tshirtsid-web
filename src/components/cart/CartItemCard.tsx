"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import type { CartItem } from "@/lib/types";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Card } from "../ui/card";

interface CartItemCardProps {
  item: CartItem;
}

export function CartItemCard({ item }: CartItemCardProps) {
  const { updateQuantity, removeFromCart } = useCart();
  const placeholder = PlaceHolderImages.find(p => p.id === item.imageId);

  return (
    <Card className="p-4">
      <div className="flex items-center gap-4">
        <div className="relative h-24 w-24 rounded-md overflow-hidden bg-muted-foreground/10 flex-shrink-0">
          {placeholder && (
            <Image
              src={placeholder.imageUrl}
              alt={item.name}
              fill
              className="object-cover"
              data-ai-hint={item.imageHint}
            />
          )}
        </div>

        <div className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <div className="md:col-span-1">
            <Link href={`/products/${item.id}`} className="font-semibold hover:underline">
              {item.name}
            </Link>
            <p className="text-sm text-muted-foreground">Talla: {item.size}</p>
            <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
          </div>

          <div className="flex items-center gap-2 justify-self-start md:justify-self-center">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <Input
              type="number"
              className="h-8 w-14 text-center"
              value={item.quantity}
              onChange={(e) => updateQuantity(item.id, item.size, parseInt(e.target.value) || 1)}
              min="1"
            />
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center gap-4 justify-self-start md:justify-self-end">
            <p className="font-semibold w-20 text-right">
              ${(item.price * item.quantity).toFixed(2)}
            </p>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-destructive"
              onClick={() => removeFromCart(item.id, item.size)}
            >
              <Trash2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

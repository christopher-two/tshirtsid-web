"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { Product, CartItem } from '@/lib/types';
import { useToast } from "@/hooks/use-toast"


interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, size: string) => void;
  removeFromCart: (id: string, size: string) => void;
  updateQuantity: (id: string, size: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { toast } = useToast()

  const addToCart = (product: Product, size: string) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id && item.size === size);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1, size }];
    });
    toast({
      title: "Added to cart",
      description: `${product.name} (${size}) has been added to your cart.`,
    })
  };

  const removeFromCart = (id: string, size: string) => {
    setCartItems(prevItems => prevItems.filter(item => !(item.id === id && item.size === size)));
    toast({
      title: "Item removed",
      description: "An item has been removed from your cart.",
      variant: "destructive"
    })
  };

  const updateQuantity = (id: string, size: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id, size);
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === id && item.size === size ? { ...item, quantity } : item
        )
      );
    }
  };
  
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

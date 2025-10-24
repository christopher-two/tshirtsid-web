"use client";

import { ProductForm } from '@/components/admin/ProductForm';
import { useFirestore } from '@/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import type { TShirt } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function AddProductPage() {
  const firestore = useFirestore();
  const { toast } = useToast();
  const router = useRouter();

  const handleAddProduct = async (data: Omit<TShirt, 'id'>) => {
    if (!firestore) return;

    try {
      const productsCollection = collection(firestore, 'tshirts');
      
      const newProductData = {
          ...data,
          id: '',
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
      }
      
      const docRef = await addDoc(productsCollection, newProductData);
      
      // We don't update with the id anymore as Firestore generates it.

      toast({
        title: '¡Producto añadido!',
        description: `La camiseta "${data.name}" ha sido añadida correctamente.`,
      });
      router.push('/admin');
    } catch (error) {
      console.error('Error al añadir el producto:', error);
      toast({
        title: 'Error',
        description: 'No se pudo añadir el producto. Por favor, inténtalo de nuevo.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Añadir Nuevo Producto</CardTitle>
        <CardDescription>Rellena los detalles para crear una nueva camiseta.</CardDescription>
      </CardHeader>
      <CardContent>
        <ProductForm onSubmit={handleAddProduct} />
      </CardContent>
    </Card>
  );
}

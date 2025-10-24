"use client";

import { ProductForm } from '@/components/admin/ProductForm';
import { useFirestore } from '@/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import type { TShirt } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

export default function AddProductPage() {
  const firestore = useFirestore();
  const { toast } = useToast();
  const router = useRouter();

  const handleAddProduct = async (data: Omit<TShirt, 'id'>) => {
    if (!firestore) return;

    const productsCollection = collection(firestore, 'tshirts');
    
    const newProductData = {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
    }
    
    addDoc(productsCollection, newProductData)
      .then((docRef) => {
        toast({
          title: '¡Producto añadido!',
          description: `La camiseta "${data.name}" ha sido añadida correctamente.`,
        });
        router.push('/admin');
      })
      .catch((error) => {
        console.error('Error al añadir el producto:', error);
        
        const contextualError = new FirestorePermissionError({
          path: productsCollection.path,
          operation: 'create',
          requestResourceData: newProductData,
        });

        errorEmitter.emit('permission-error', contextualError);
      });
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

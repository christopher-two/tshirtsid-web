
"use client";

import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { useRouter, useParams } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { ProductForm } from '@/components/admin/ProductForm';
import type { TShirt } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useState } from 'react';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

export default function EditProductPage() {
  const firestore = useFirestore();
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const productId = Array.isArray(params.id) ? params.id[0] : params.id;

  const productRef = useMemoFirebase(() => {
    if (!firestore || !productId) return null;
    return doc(firestore, 'tshirts', productId);
  }, [firestore, productId]);

  const { data: product, isLoading } = useDoc<TShirt>(productRef);

  const handleEditProduct = async (data: Omit<TShirt, 'id'>) => {
    if (!firestore || !product) return;
    setIsSubmitting(true);
    
    const productDocRef = doc(firestore, 'tshirts', product.id);
    
    const updatedProductData = {
        ...data,
        updatedAt: serverTimestamp(),
    }

    updateDoc(productDocRef, updatedProductData)
      .then(() => {
        toast({
          title: '¡Producto actualizado!',
          description: `La camiseta "${data.name}" ha sido actualizada correctamente.`,
        });
        router.push('/admin');
      })
      .catch((error) => {
        console.error('Error al actualizar el producto:', error);
        
        const contextualError = new FirestorePermissionError({
            path: productDocRef.path,
            operation: 'update',
            requestResourceData: updatedProductData,
        });

        errorEmitter.emit('permission-error', contextualError);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  if (isLoading) {
    return (
        <Card>
            <CardHeader>
                <Skeleton className="h-8 w-1/2" />
                <Skeleton className="h-4 w-3/4" />
            </CardHeader>
            <CardContent className="space-y-8">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-10 w-full" />
            </CardContent>
        </Card>
    )
  }

  if (!product) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Producto no encontrado</CardTitle>
                <CardDescription>
                    No se pudo encontrar el producto que intentas editar.
                </CardDescription>
            </CardHeader>
        </Card>
    )
  }


  return (
    <Card>
      <CardHeader>
        <CardTitle>Editar Producto</CardTitle>
        <CardDescription>Modifica los detalles de la camiseta "{product.name}".</CardDescription>
      </CardHeader>
      <CardContent>
        <ProductForm onSubmit={handleEditProduct} initialData={product} isSubmitting={isSubmitting} />
      </CardContent>
    </Card>
  );
}

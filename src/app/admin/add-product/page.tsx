"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useFirestore } from '@/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { addDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'El nombre debe tener al menos 2 caracteres.',
  }),
  description: z.string().min(10, {
    message: 'La descripción corta debe tener al menos 10 caracteres.',
  }),
  longDescription: z.string().min(20, {
    message: 'La descripción larga debe tener al menos 20 caracteres.',
  }),
  price: z.coerce.number().positive({
    message: 'El precio debe ser un número positivo.',
  }),
  sizes: z.string().min(1, {
    message: 'Debe haber al menos una talla.',
  }).transform(val => val.split(',').map(s => s.trim().toUpperCase())),
  imageId: z.string().min(1, {
    message: 'Se requiere un ID de imagen.',
  }),
  imageHint: z.string().min(1, {
    message: 'Se requiere una pista de imagen.',
  }),
  category: z.enum(['men', 'women', 'kids'], {
    errorMap: () => ({ message: "La categoría debe ser 'men', 'women' o 'kids'." }),
  }),
});

export default function AddProductPage() {
  const firestore = useFirestore();
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      longDescription: '',
      price: 0,
      sizes: [],
      imageId: '',
      imageHint: '',
      category: 'men',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!firestore) return;
    
    try {
      const productsCollection = collection(firestore, 'tshirts');
      await addDoc(productsCollection, { ...values, id: Date.now().toString() });

      toast({
        title: '¡Producto añadido!',
        description: `La camiseta "${values.name}" ha sido añadida correctamente.`,
      });
      router.push('/collection');
    } catch (error) {
      console.error('Error al añadir el producto:', error);
      toast({
        title: 'Error',
        description: 'No se pudo añadir el producto. Por favor, inténtalo de nuevo.',
        variant: 'destructive',
      });
    }
  }

  return (
    <Card className="max-w-2xl mx-auto">
        <CardHeader>
            <CardTitle className="text-center">Añadir Nuevo Producto</CardTitle>
        </CardHeader>
        <CardContent>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Nombre del Producto</FormLabel>
                        <FormControl>
                        <Input placeholder="Ej: Camiseta Minimalista" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Descripción Corta</FormLabel>
                        <FormControl>
                        <Input placeholder="Una breve descripción para la vista previa" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="longDescription"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Descripción Larga</FormLabel>
                        <FormControl>
                        <Textarea
                            placeholder="Describe el producto en detalle para la página de producto."
                            {...field}
                        />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Precio</FormLabel>
                        <FormControl>
                        <Input type="number" step="0.01" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="sizes"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Tallas</FormLabel>
                        <FormControl>
                        <Input placeholder="S, M, L, XL" {...field} onChange={(e) => field.onChange(e.target.value)} />
                        </FormControl>
                        <FormDescription>
                        Separadas por comas.
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="imageId"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>ID de Imagen</FormLabel>
                        <FormControl>
                        <Input placeholder="Ej: tshirt-geo-abstract" {...field} />
                        </FormControl>
                        <FormDescription>
                        El ID de una imagen existente en `placeholder-images.json`.
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="imageHint"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Pista de Imagen (para IA)</FormLabel>
                        <FormControl>
                        <Input placeholder="Ej: geometric tshirt" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Categoría</FormLabel>
                        <FormControl>
                        <Input placeholder="men, women, o kids" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <Button type="submit" className="w-full">Añadir Producto</Button>
                </form>
            </Form>
        </CardContent>
    </Card>
  );
}
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
import type { TShirt } from '@/lib/types';
import { useEffect, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Sparkles } from 'lucide-react';
import { generateProductDetails } from '@/ai/flows/generate-product-flow';
import { useToast } from '@/hooks/use-toast';


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
  }).transform(val => val.split(',').map(s => s.trim().toUpperCase()).filter(Boolean)),
  imageUrl: z.string().url({
    message: 'Por favor, introduce una URL de imagen válida.',
  }),
  imageHint: z.string().min(1, {
    message: 'Se requiere una pista de imagen.',
  }),
  category: z.enum(['men', 'women', 'kids'], {
    errorMap: () => ({ message: "La categoría debe ser 'men', 'women' o 'kids'." }),
  }),
});

type ProductFormValues = z.infer<typeof formSchema>;

interface ProductFormProps {
  onSubmit: (data: ProductFormValues) => void;
  initialData?: TShirt;
  isSubmitting?: boolean;
}

export function ProductForm({ onSubmit, initialData, isSubmitting }: ProductFormProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();
    
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      longDescription: '',
      price: 0,
      sizes: [],
      imageUrl: '',
      imageHint: '',
      category: 'men',
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset({
        ...initialData,
        sizes: initialData.sizes.join(', '),
      });
    }
  }, [initialData, form]);
  
  const handleGenerateDetails = async () => {
    const name = form.getValues('name');
    const category = form.getValues('category');

    if (!name) {
      form.setError('name', { message: 'Por favor, introduce un nombre primero.' });
      return;
    }
    
    setIsGenerating(true);
    toast({
      title: 'Generando detalles...',
      description: 'La IA está creando el contenido del producto.',
    });
    
    try {
      const result = await generateProductDetails({ name, category });
      form.setValue('description', result.description, { shouldValidate: true });
      form.setValue('longDescription', result.longDescription, { shouldValidate: true });
      form.setValue('price', result.price, { shouldValidate: true });
      form.setValue('imageHint', result.imageHint, { shouldValidate: true });
       toast({
        title: '¡Contenido generado!',
        description: 'Los campos se han rellenado automáticamente.',
      });
    } catch (error) {
      console.error('Error al generar detalles con IA:', error);
       toast({
        title: 'Error de la IA',
        description: 'No se pudo generar el contenido. Por favor, inténtalo de nuevo.',
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(false);
    }
  };


  const handleSubmit = (values: ProductFormValues) => {
    onSubmit(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre del Producto</FormLabel>
                <div className="flex gap-2">
                    <FormControl>
                        <Input placeholder="Ej: Camiseta Minimalista" {...field} />
                    </FormControl>
                    <Button type="button" variant="outline" size="icon" onClick={handleGenerateDetails} disabled={isGenerating}>
                        <Sparkles className={`h-4 w-4 ${isGenerating ? 'animate-spin' : ''}`} />
                        <span className="sr-only">Generar con IA</span>
                    </Button>
                </div>
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
                <Input placeholder="S, M, L, XL" {...field} />
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
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL de la Imagen</FormLabel>
              <FormControl>
                <Input placeholder="https://ejemplo.com/imagen.jpg" {...field} />
              </FormControl>
              <FormDescription>
                Pega la URL de una imagen alojada en un servicio externo como Imgur.
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una categoría" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="men">Hombre</SelectItem>
                  <SelectItem value="women">Mujer</SelectItem>
                  <SelectItem value="kids">Niños</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting || isGenerating}>
          {isSubmitting ? 'Guardando...' : 'Guardar Producto'}
        </Button>
      </form>
    </Form>
  );
}

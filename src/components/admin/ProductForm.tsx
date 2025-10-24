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
import { Sparkles } from 'lucide-react';
import { generateProductDetails } from '@/ai/flows/generate-product-flow';
import { useToast } from '@/hooks/use-toast';
import { Checkbox } from "@/components/ui/checkbox"

const ALL_SIZES = ["XS", "S", "M", "L", "XL", "XXL"] as const;
const ALL_CATEGORIES = ["men", "women", "kids"] as const;

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
  sizes: z.array(z.string()).refine(value => value.some(item => item), {
    message: "Debes seleccionar al menos una talla.",
  }),
  imageUrl: z.string().url({
    message: 'Por favor, introduce una URL de imagen válida.',
  }),
  imageHint: z.string().min(1, {
    message: 'Se requiere una pista de imagen.',
  }),
  category: z.array(z.enum(['men', 'women', 'kids'])).refine(value => value.some(item => item), {
    message: "Debes seleccionar al menos una categoría.",
  }),
});

type ProductFormValues = z.infer<typeof formSchema>;

interface ProductFormProps {
  onSubmit: (data: Omit<TShirt, 'id'>) => void;
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
      category: [],
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset({
        ...initialData,
        sizes: initialData.sizes || [],
        category: initialData.category || [],
      });
    }
  }, [initialData, form]);
  
  const handleGenerateDetails = async () => {
    const name = form.getValues('name');
    const categories = form.getValues('category');
    
    if (!name) {
      form.setError('name', { message: 'Por favor, introduce un nombre primero.' });
      return;
    }
    if (categories.length === 0) {
        form.setError('category', { message: 'Por favor, selecciona al menos una categoría para la IA.'});
        return;
    }
    
    setIsGenerating(true);
    toast({
      title: 'Generando detalles...',
      description: 'La IA está creando el contenido del producto.',
    });
    
    try {
      // Pass only the first category to the AI for simplicity
      const result = await generateProductDetails({ name, category: categories[0] });
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
            render={() => (
                <FormItem>
                <div className="mb-4">
                    <FormLabel>Tallas</FormLabel>
                    <FormDescription>
                    Selecciona las tallas disponibles para esta camiseta.
                    </FormDescription>
                </div>
                <div className="flex flex-wrap gap-4">
                    {ALL_SIZES.map((size) => (
                    <FormField
                        key={size}
                        control={form.control}
                        name="sizes"
                        render={({ field }) => {
                        return (
                            <FormItem
                            key={size}
                            className="flex flex-row items-start space-x-3 space-y-0"
                            >
                            <FormControl>
                                <Checkbox
                                checked={field.value?.includes(size)}
                                onCheckedChange={(checked) => {
                                    return checked
                                    ? field.onChange([...field.value, size])
                                    : field.onChange(
                                        field.value?.filter(
                                        (value) => value !== size
                                        )
                                    );
                                }}
                                />
                            </FormControl>
                            <FormLabel className="font-normal">
                                {size}
                            </FormLabel>
                            </FormItem>
                        );
                        }}
                    />
                    ))}
                </div>
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
            render={() => (
                <FormItem>
                <div className="mb-4">
                    <FormLabel>Categorías</FormLabel>
                    <FormDescription>
                    Selecciona las categorías para esta camiseta.
                    </FormDescription>
                </div>
                <div className="flex flex-wrap gap-4">
                    {ALL_CATEGORIES.map((category) => (
                    <FormField
                        key={category}
                        control={form.control}
                        name="category"
                        render={({ field }) => {
                        return (
                            <FormItem
                            key={category}
                            className="flex flex-row items-start space-x-3 space-y-0"
                            >
                            <FormControl>
                                <Checkbox
                                checked={field.value?.includes(category)}
                                onCheckedChange={(checked) => {
                                    return checked
                                    ? field.onChange([...field.value, category])
                                    : field.onChange(
                                        field.value?.filter(
                                        (value) => value !== category
                                        )
                                    );
                                }}
                                />
                            </FormControl>
                            <FormLabel className="font-normal capitalize">
                                {category === 'men' ? 'Hombre' : category === 'women' ? 'Mujer' : 'Niños'}
                            </FormLabel>
                            </FormItem>
                        );
                        }}
                    />
                    ))}
                </div>
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

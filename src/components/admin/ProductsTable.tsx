"use client";

import Image from "next/image"
import Link from "next/link";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase";
import { collection, deleteDoc, doc } from "firebase/firestore";
import type { TShirt } from "@/lib/types";
import { Skeleton } from "../ui/skeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";


function DeleteConfirmationDialog({ open, onOpenChange, onConfirm, productName }: { open: boolean, onOpenChange: (open: boolean) => void, onConfirm: () => void, productName: string }) {
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>¿Estás absolutamente seguro?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Esta acción no se puede deshacer. Esto eliminará permanentemente la camiseta
                        <span className="font-bold"> {productName} </span>
                        de la base de datos.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={onConfirm} className="bg-destructive hover:bg-destructive/90">Eliminar</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export function ProductsTable() {
    const firestore = useFirestore();
    const { toast } = useToast();

    const productsCollection = useMemoFirebase(() => {
        if (!firestore) return null;
        return collection(firestore, 'tshirts');
    }, [firestore]);

    const { data: products, isLoading } = useCollection<TShirt>(productsCollection);

    const [isDeleting, setIsDeleting] = useState(false);
    const [productToDelete, setProductToDelete] = useState<TShirt | null>(null);

    const handleDeleteClick = (product: TShirt) => {
        setProductToDelete(product);
        setIsDeleting(true);
    }

    const confirmDelete = async () => {
        if (!productToDelete || !firestore) return;
        
        try {
            const productDocRef = doc(firestore, 'tshirts', productToDelete.id);
            await deleteDoc(productDocRef);
            toast({
                title: "Producto Eliminado",
                description: `La camiseta "${productToDelete.name}" ha sido eliminada.`,
            });
        } catch (error) {
            console.error("Error al eliminar el producto:", error);
            toast({
                title: "Error",
                description: "No se pudo eliminar el producto.",
                variant: "destructive",
            });
        } finally {
            setIsDeleting(false);
            setProductToDelete(null);
        }
    }


    if (isLoading) {
        return (
            <div className="space-y-2">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
            </div>
        )
    }

    if (!products || products.length === 0) {
        return <p className="text-center text-muted-foreground">No se encontraron productos.</p>
    }

    const categoryTitles: Record<string, string> = {
        men: 'Hombre',
        women: 'Mujer',
        kids: 'Niños'
    }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="hidden w-[100px] sm:table-cell">
              <span className="sr-only">Imagen</span>
            </TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Categorías</TableHead>
            <TableHead className="hidden md:table-cell">Tallas</TableHead>
            <TableHead className="hidden md:table-cell">Precio</TableHead>
            <TableHead>
              <span className="sr-only">Acciones</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => {
            return (
                <TableRow key={product.id}>
                    <TableCell className="hidden sm:table-cell">
                    {product.imageUrl ? (
                      <Image
                        alt={product.name}
                        className="aspect-square rounded-md object-cover"
                        height="64"
                        src={product.imageUrl}
                        width="64"
                      />
                    ) : (
                        <div className="h-16 w-16 bg-muted rounded-md flex items-center justify-center">
                            <span className="text-xs text-muted-foreground">Sin img</span>
                        </div>
                    )}
                    </TableCell>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>
                        <div className="flex flex-wrap gap-1">
                            {product.category.map(cat => (
                                <Badge key={cat} variant="outline">{categoryTitles[cat] || cat}</Badge>
                            ))}
                        </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{product.sizes.join(', ')}</TableCell>
                    <TableCell className="hidden md:table-cell">${product.price.toFixed(2)}</TableCell>
                    <TableCell>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                        <Button
                            aria-haspopup="true"
                            size="icon"
                            variant="ghost"
                        >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                        </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                        <DropdownMenuItem asChild>
                            <Link href={`/admin/edit/${product.id}`} className="cursor-pointer">
                                <Pencil className="mr-2 h-4 w-4" />
                                Editar
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeleteClick(product)} className="text-red-500 focus:text-red-500 cursor-pointer">
                             <Trash2 className="mr-2 h-4 w-4" />
                            Eliminar
                        </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
      {productToDelete && (
        <DeleteConfirmationDialog 
            open={isDeleting}
            onOpenChange={setIsDeleting}
            onConfirm={confirmDelete}
            productName={productToDelete.name}
        />
      )}
    </>
  )
}

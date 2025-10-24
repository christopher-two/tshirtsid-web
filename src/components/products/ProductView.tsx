"use client";

import { useState, useMemo } from 'react';
import type { Product } from '@/lib/types';
import { ProductGrid } from './ProductGrid';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ProductViewProps {
  allProducts: Product[];
}

type SortKey = 'name-asc' | 'name-desc' | 'price-asc' | 'price-desc' | 'default';

export function ProductView({ allProducts }: ProductViewProps) {
  const [sortKey, setSortKey] = useState<SortKey>('default');
  
  const allSizes = useMemo(() => {
    const sizes = new Set<string>();
    allProducts.forEach(p => p.sizes.forEach(s => sizes.add(s)));
    return Array.from(sizes).sort();
  }, [allProducts]);
  
  const [filterSize, setFilterSize] = useState('all');

  const sortedAndFilteredProducts = useMemo(() => {
    let products = [...allProducts];

    if (filterSize !== 'all') {
      products = products.filter(p => p.sizes.includes(filterSize));
    }

    switch (sortKey) {
      case 'name-asc':
        products.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        products.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'price-asc':
        products.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        products.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }
    return products;
  }, [allProducts, sortKey, filterSize]);

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-end">
        <div className="flex items-center gap-2">
          <label htmlFor="filter-size" className="text-sm font-medium uppercase">Filtrar:</label>
          <Select value={filterSize} onValueChange={setFilterSize}>
            <SelectTrigger id="filter-size" className="w-[120px]">
              <SelectValue placeholder="Talla" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              {allSizes.map(size => (
                <SelectItem key={size} value={size}>{size}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="sort-by" className="text-sm font-medium uppercase">Ordenar:</label>
          <Select value={sortKey} onValueChange={(value) => setSortKey(value as SortKey)}>
            <SelectTrigger id="sort-by" className="w-[180px]">
              <SelectValue placeholder="Ordenar" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Por Defecto</SelectItem>
              <SelectItem value="price-asc">Precio: Bajo a Alto</SelectItem>
              <SelectItem value="price-desc">Precio: Alto a Bajo</SelectItem>
              <SelectItem value="name-asc">Nombre: A a Z</SelectItem>
              <SelectItem value="name-desc">Nombre: Z a A</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <ProductGrid products={sortedAndFilteredProducts} />
    </div>
  );
}

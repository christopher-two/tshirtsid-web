export interface Product {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  price: number;
  sizes: string[];
  imageId: string;
  imageHint: string;
  category: 'men' | 'women' | 'kids';
}

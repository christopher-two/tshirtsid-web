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

export interface CartItem {
  id: string;
  name: string;
  price: number;
  imageId: string;
  imageHint: string;
  quantity: number;
  size: string;
}

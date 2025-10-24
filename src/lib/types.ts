export interface TShirt {
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

export interface Product extends TShirt {}

export interface CartItem extends Product {
  quantity: number;
  size: string;
}

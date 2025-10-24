export interface TShirt {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  price: number;
  sizes: string[];
  imageUrl: string;
  imageHint: string;
  category: 'men' | 'women' | 'kids';
  createdAt?: { seconds: number, nanoseconds: number };
  updatedAt?: { seconds: number, nanoseconds: number };
}

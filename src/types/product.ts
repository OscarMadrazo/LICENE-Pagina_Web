export interface Product {
  id: string;
  name: string;
  description: string;

  price: number;
  stock: number;

  imageUrl?: string;

  brand?: {
    id: string;
    name: string;
  };

  category?: {
    id: string;
    name: string;
  };
}
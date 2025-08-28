export interface ProductRes {
  id: string;
  name: string;
  description: string;
  price: number;
  category: {
    id: number;
    name: string;
  };
  stock: number;
  images: { image_url: string }[];
}

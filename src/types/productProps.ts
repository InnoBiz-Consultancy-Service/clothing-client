export interface ProductProps {
  _id: string;
  name: string;
  price: number | string;
  description: string;
  category: string;
  subCategory: string;
  colors: string;
  sizes: string[];
  images: { src: string }[];

}

export interface ProductCardProps {
  _id: string;
  name: string;
  price: number;
  images: { src: string }[];
  category: string | null
}
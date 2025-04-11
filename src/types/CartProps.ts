export interface CartProps {
    _id: string;
    name: string;
    price: number;
    quantity: number;
    images: { src: string }[];
    color?: string;
    size?: string;
};
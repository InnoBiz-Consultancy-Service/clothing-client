export interface Order {
    name: string;
    email: string;
    company: string;
    productType: string;
    phone?: string;
    quantity?: number;
    deliveryDate?: string;
    description?: string;
}
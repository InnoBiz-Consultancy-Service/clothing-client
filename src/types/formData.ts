

export interface FormData {
    firstName: string;
    lastName: string;
    companyName?: string;
    address: string;
    state?: string;
    city?: string;
    zipCode?: string;
    country?: string;
    email: string;
    phoneNumber: string;
    differentAddress?: boolean;
}

export interface CartItem {
    addedAt: string;
    productId: string;
    productName: string;
    productPrice: number;
    quantity: number;
    totalPrice: number;
    images: { src: string }[];
}
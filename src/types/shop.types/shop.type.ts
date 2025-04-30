import {Disease} from "@/types/test.types/testToUpdate.type";

export interface Ingredient {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    createdAt: string;
    updatedAt: string;
}

export interface ProductItem {
    id: number;
    price: number;
    complect?: string;
}

export interface Category2 {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
}

export interface Product {
    id: number;
    name: string;
    imageUrl: string;
    categoryId: number;
    createdAt: string;
    updatedAt: string;
    category?: Category2;
    items: ProductItem[];
    ingredients: Ingredient[];
    Disease?: Disease[];
}

export interface CartItem {
    id: number;
    cartId: number;
    productItemId: number;
    quantity: number;
    createdAt: string;
    updatedAt: string;
    productItem: ProductItem;
    ingredients: Ingredient[];
}

export interface Cart {
    id: number;
    userId?: string;
    token: string;
    totalAmount: number;
    createdAt: string;
    updatedAt: string;
    items: CartItem[];
}

export enum OrderStatus {
    PENDING = 'PENDING',
    SUCCEEDED = 'SUCCEEDED',
    CANCELLED = 'CANCELLED'
}

export interface Order {
    id: number;
    userId?: string;
    token: string;
    totalAmount: number;
    status: OrderStatus;
    paymentId?: string;
    items: string[]; // можно типизировать отдельно
    fullName: string;
    email: string;
    phone: string;
    address: string;
    comment?: string;
    createdAt: string;
    updatedAt: string;
}


export interface ProductFull {
    id: number;
    name: string;
    imageUrl: string;
    categoryId: number;
    createdAt: string;
    updatedAt: string;

    // связи:
    category: Category2;
    items: ProductItem[];
    ingredients: Ingredient[];
    Disease: Disease[];
}

export interface CategoryProduct {
    items: ProductItem[];
    ingredients: Ingredient[];
}

export interface CategoryWithProducts {
    products: CategoryProduct[];
}

export interface CategoryType {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    products: ProductFull[];
}

import {Cart, CartItem, Ingredient, ProductItem} from "@/types/shop.types/shop.type";
import {Product} from "@/types/product.type";


export type CartItemDTO = CartItem & {
  productItem: ProductItem & {
    product: Product;
  };
  ingredients: Ingredient[];
};

export interface CartDTO extends Cart {
  items: CartItemDTO[];
}

export interface CreateCartItemValues {
  productItemId: number;
  ingredients?: number[];
}

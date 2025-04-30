import {fetcher} from "@/api/lib/fetcher";
import {CreateCartItemValues} from "@/types/shop.types/cart.dto";
import {CartDTO} from "@/types/cart.dto";

export async function getCart() {
    return await fetcher('/shop/cart') as CartDTO
}

export async function postCart(values: CreateCartItemValues) {
    return await fetcher('/shop/cart', {
        method: "POST",
        body: JSON.stringify(values),
    }) as CartDTO;
}

export async function updateCart(id: number, quantity: number) {
    return await fetcher(`/shop/cart/${id}`, {
        method: "PATCH",
        body: JSON.stringify({quantity}),
    }) as CartDTO;
}

export async function removeCartItem(id: number) {
    return await fetcher(`/shop/cart/${id}`, {
        method: "DELETE",
    }) as CartDTO;
}

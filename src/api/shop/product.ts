import {fetcher} from "@/api/lib/fetcher";
import {ProductFull} from "@/types/shop.types/shop.type";

export async function getProductById(id: number): Promise<ProductFull> {
    return await fetcher(`/api/shop/product/${id}`);
}

export async function createProductItem(data: any) {
    return await fetcher(`/api/shop/createProductItem`, {
        method: "POST",
        body: JSON.stringify(data),
    })
}
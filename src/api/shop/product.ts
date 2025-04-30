
import {fetcher} from "@/api/lib/fetcher";
import {ProductFull} from "@/types/shop.types/shop.type";

export async function getProductById(id: number): Promise<ProductFull> {
    return await fetcher(`/shop/product/${id}`);
}
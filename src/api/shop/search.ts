import {fetcher} from "@/api/lib/fetcher";
import {Product} from "@/types/product.type";

export async function search(query: string) {
    return await fetcher(`/api/shop/search?query=${query}` ) as Product[]
}
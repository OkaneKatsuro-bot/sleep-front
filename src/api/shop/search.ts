
import {Product} from "@/types/product.type";

export async function search(query: string) {
    return await fetch(`https://sleep-backend-0048.onrender.com/api/shop/search?query=${query}`) as unknown as Product[]
}
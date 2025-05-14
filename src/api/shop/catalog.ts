import {fetcher} from "@/api/lib/fetcher";
import {CategoryType} from "@/types/shop.types/shop.type";

export async function catalog(minPrice: number, maxPrice: number, ingredientsIdArr: number[], sizes: string[]) {
    const ingredients = ingredientsIdArr.join(',');
    const res =  await fetch(`https://sleep-backend-0048.onrender.com/api/shop/catalog?minPrice=${minPrice}&maxPrice=${maxPrice}&ingredients=${ingredients}&sizes=${sizes}`);
    const data = (await res.json()) as CategoryType[];
    return data;
}

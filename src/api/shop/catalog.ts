import {fetcher} from "@/api/lib/fetcher";

export async function catalog(minPrice: number, maxPrice: number, ingredientsIdArr: number[], sizes: string[]) {
    const ingredients = ingredientsIdArr.join(',');
    return await fetcher(`/api/shop/catalog?minPrice=${minPrice}&maxPrice=${maxPrice}&ingredients=${ingredients}&sizes=${sizes}`);
}

import {fetcher} from "@/api/lib/fetcher";
import {Ingredient} from "@/types/shop.types/shop.type";

export async function getIngredients() {
    return await fetcher('/api/shop/ingredients') as Ingredient[]
}
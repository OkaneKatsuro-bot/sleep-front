import {fetcher} from "@/api/lib/fetcher";
import {Ingredient} from "@/types/shop.types/shop.type";

export async function getIngredients() {
    return await fetcher('/shop/ingredients') as Ingredient[]
}
import {ActionResult, handleAction} from "@/lib/handleAction";
import {shop} from '@/api'
import {Category2, Ingredient} from "@/types/shop.types/shop.type";
import {Product} from "@/types/product.type";

export async function getCategoriesAction(): Promise<ActionResult<{ categories: Category2[] }>> {
    return handleAction(async () => {
        const categories = await shop.getCategories() as Category2[];
        return {categories}
    })
}

export async function getIngredientsAction(): Promise<ActionResult<{ ingredients: Ingredient[] }>> {
    return handleAction(async () => {
        const ingredients = await shop.getIngredients() as Ingredient[];
        return {ingredients}
    })
}

export async function getProductsAction(): Promise<ActionResult<{ products: Product[] }>> {
    return handleAction(async () => {
        const products = await shop.getProducts() as Product[];
        return {products}
    })
}

export async function createCategoryAction(data: string): Promise<ActionResult> {
    return handleAction(async () => {
        return await shop.createCategory(data);
    })
}

export async function createProductAction(data: FormData): Promise<ActionResult> {
    return handleAction(async () => {
        return await shop.createProduct(data);
    })
}

export async function createProductItemAction(data: any): Promise<ActionResult> {
    return handleAction(async () => {
        return await shop.createProductItem(data);
    })
}
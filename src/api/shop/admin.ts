import {fetcher} from "@/api/lib/fetcher";

export async function getCategories() {
    return fetcher('/shop/categories')
}

export async function getProducts() {
    return await fetcher('/shop/products')
}

export async function createCategory(data: string) {
    return fetcher('/shop/categories',
        {
            method: 'POST',
            body: JSON.stringify({data}),
        }
    )
}

export async function createProduct(data: FormData) {
    return fetcher('/shop/products',
        {
            method: 'POST',
            body: data,
        }
    )
}
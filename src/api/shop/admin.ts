import {fetcher} from "@/api/lib/fetcher";

export async function getCategories() {
    return fetcher('/api/shop/categories')
}

export async function getProducts() {
    return await fetcher('/api/shop/products')
}

export async function createCategory(data: string) {
    return fetcher('/api/shop/categories',
        {
            method: 'POST',
            body: JSON.stringify({data}),
        }
    )
}

export async function createProduct(data: FormData) {
    return fetcher('/api/shop/products',
        {
            method: 'POST',
            body: data,
        }
    )
}
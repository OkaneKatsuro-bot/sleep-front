import {fetcher} from "@/api/lib/fetcher";

export async function getMethods() {
    return await fetcher('/method')
}

export async function createMethod(formData: FormData) {
    return await fetcher('/method/createMethod', {
        method: 'POST',
        body: formData,
    })
}
import {fetcher} from "@/api/lib/fetcher";
export async function createDoctor(formData: FormData) {
    return await fetcher('/admin/createDoctor', {
        method: 'POST',
        body: formData
    })
}
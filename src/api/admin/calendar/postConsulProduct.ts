import {fetcher} from "@/api/lib/fetcher";


export async function postConsulProduct(formData: FormData) {
    console.trace("🧠 postConsulProduct called");
    return await fetcher('/admin/calendar/consultProducts', {
        method: 'POST',
        body: formData
    })
}

import {fetcher} from "@/api/lib/fetcher";

export async function uploadPostImage(formData: FormData) {

    return await fetcher('api/admin/posts/uploadImage', {
        method: 'POST',
        body: formData,
    })
}
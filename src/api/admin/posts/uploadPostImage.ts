import {fetcher} from "@/api/lib/fetcher";

export async function uploadPostImage(formData: FormData) {

    return await fetcher('/admin/posts/uploadImage', {
        method: 'POST',
        body: formData,
    })
}
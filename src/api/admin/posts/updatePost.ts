import {fetcher} from "@/api/lib/fetcher";
import {PostToUpdate} from "@/types/postToUpdate.type";

export async function updatePost(post: PostToUpdate) {
    return fetcher('/admin/posts/updatePost', {
        method: 'PATCH',
        body: JSON.stringify(post),
    })
}
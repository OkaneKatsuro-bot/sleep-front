import {fetcher} from "@/api/lib/fetcher";

export async function updatePostsCategory(postId: number, categoryId: number, action: string) {
    return fetcher(`/admin/posts/updatePostsCategory`, {
        method: 'POST',
        body: JSON.stringify({
            postId,
            categoryId,
            action
        })
    })
}
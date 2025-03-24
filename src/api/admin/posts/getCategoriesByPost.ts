import {fetcher} from "@/api/lib/fetcher";

export async function getCategoriesByPost(postId: number) {
    return await fetcher(`/admin/posts/getCategoriesByPost?postId=${postId}`,)
}
import {fetcher} from "@/api/lib/fetcher";

export async function deletePost(postId: number){
    return fetcher('/admin/posts/deletePost',{
        method: 'DELETE',
        body:JSON.stringify({
            postId,
        })
    })
}
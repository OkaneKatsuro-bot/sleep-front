import {fetcher} from "@/api/lib/fetcher";

export async function postNewCategoryForPost(postId: number, name : string){
    return await fetcher('/admin/posts/postNewCategoryForPost', {
        method: 'POST',
        body: JSON.stringify({
            postId,
            name,
        })
    });
}
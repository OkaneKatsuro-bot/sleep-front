import {fetcher} from "@/api/lib/fetcher";

export async function createPost(title:string){
    return fetcher('/admin/posts/createPost',{
        method:'POST',
        body:JSON.stringify({
            title,
        })
    })
}
import {fetcher} from "@/api/lib/fetcher";

export async function getAllPosts(){
    return fetcher('/admin/posts/getAllPosts');
}
import {fetcher} from "@/api/lib/fetcher";

export async function getPosts(){
    return await fetcher(`/posts`);
}

export async function getPostByTitle(title: string){
    return await fetcher(`/posts/${title}`);
}
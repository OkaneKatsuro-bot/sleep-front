import {ActionResult, handleAction} from "@/lib/handleAction";
import {posts as postsApi} from "@/api"
import { Post} from "@/app/articles/[title]/page";
import {Cat, Post as Posts} from "@/components/postsforuser/PostPageComp";

export interface PostsWCategoty {
    post: Posts[],
    cat: Cat[]
}

export interface PostsWCategoty2{
    post: Posts[],
    cat: Cat[]
}

export async function getPostsAction(): Promise<ActionResult<{ data: PostsWCategoty }>> {
    return handleAction(async () => {
        const data = await postsApi.getPosts() as PostsWCategoty;
        return {data}
    })
}

export async function getPostByTitleAction(title: string): Promise<ActionResult<{ data: Post }>> {
    return handleAction(async () => {
        const data = await postsApi.getPostByTitle(title) as Post;
        return {data}
    })
}
import {Category, Post} from "@/types/posts.type";
import {ActionResult, handleAction} from "@/lib/handleAction";
import {admin} from "@/api";
import {PostToUpdate} from "@/types/postToUpdate.type";

export async function getAllPostsAction(): Promise<ActionResult<{ posts: Post[] }>> {
    return handleAction(async () => {
        const posts = await admin.posts.getAllPosts() as Post[];
        return {posts}
    })
}

export async function createPostAction(title: string): Promise<ActionResult<{ post: Post }>> {
    return handleAction(async () => {
        const post = await admin.posts.createPost(title) as Post;
        return {post};
    })
}

export async function deletePostAction(postId: number): Promise<ActionResult> {
    return handleAction(async () => {
        return await admin.posts.deletePost(postId);
    })
}


export async function updatePostAction(post: PostToUpdate): Promise<ActionResult> {
    return handleAction(async () => {
        return await admin.posts.updatePost(post)
    })
}

export async function getCategoriesByPostAction(postId: number): Promise<ActionResult<{
    postCategories: Category[],
    allCategories: Category[]
}>> {
    return handleAction(async () => {
        const {postCategories, allCategories} = await admin.posts.getCategoriesByPost(postId) as {
            postCategories: Category[];
            allCategories: Category[];
        };
        return {postCategories, allCategories};
    })
}

export async function uploadPostImageAction(formData: FormData): Promise<ActionResult<{ imageUrl: string }>> {
    return handleAction(async () => {
        const imageUrl = await admin.posts.uploadPostImage(formData) as string;
        return {imageUrl};

    })
}

export async function postNewCategoryForPostAction(postId: number, name: string): Promise<ActionResult> {
    return handleAction(async () => {
        return await admin.posts.postNewCategoryForPost(postId, name);
    })
}

export async function updatePostsCategoryAction(postId: number , categoryId: number, action: string): Promise<ActionResult> {
    return handleAction(async () => {
        return await admin.posts.updatePostsCategory(postId, categoryId, action);
    })
}
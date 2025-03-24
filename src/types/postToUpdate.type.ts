import {Category, PostType} from "@/types/posts.type";

export interface PostToUpdate {
    id: number;
    body?: string;
    categories?: Category[];
    image?: string;
    posttype?: PostType[];
}


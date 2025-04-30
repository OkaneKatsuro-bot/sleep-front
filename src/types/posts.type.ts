export interface Post {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    title: string;
    body: string;
    published: boolean;
    authorId: number;
    categories: Category[];
    image?: string;
    posttype: PostType;
}

export interface Category {
    name: string;
    id: number;
}

export enum PostType {
    MAIN = 'MAIN',
    TEST = 'TEST',
    BASE = 'BASE',
}


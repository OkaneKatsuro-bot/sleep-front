import { create } from "zustand";
import {Post} from "@/types/posts.type";


interface PostEditorStore {
    currentPost: Post | null;
    isCreatingPost: boolean;

    setCurrentPost: (post: Post | null) => void;
    setIsCreatingPost: (value: boolean) => void;
    resetEditor: () => void;
}

export const usePostEditorStore = create<PostEditorStore>((set) => ({
    currentPost: null,
    isCreatingPost: false,
    setCurrentPost: (post: Post | null) => set({ currentPost: post }),
    setIsCreatingPost: (value: boolean) => set({ isCreatingPost: value }),
    resetEditor: () => set({ currentPost: null, isCreatingPost: false }),
}));
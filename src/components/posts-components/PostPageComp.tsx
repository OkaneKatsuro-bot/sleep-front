"use client";
import React, {useEffect, useState} from "react";

import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";
import {PostsCard} from "@/components/posts-components/PostCard";

interface Cat {
    id: number;
    name: string;
}

export type Post = {
    id: number;
    title: string;
    body: string;
    published: boolean;
    image?: string;
    categories?: string[];
    posttype?: string[]; // Добавляем поле posttype
};

interface PostPageCompProps {
    showLimited?: boolean; // Новый пропс
}

export function PostPageComp({showLimited = false}: PostPageCompProps) {
    const [posts, setPosts] = useState<Post[] | null>(null);
    const [categories, setCategories] = useState<Cat[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    // Функция для загрузки данных
    const fetchData = async () => {
        try {
            const [postsResponse, categoriesResponse] = await Promise.all([
                fetch("/api/articles", {
                    headers: {"Cache-Control": "no-cache"},
                    cache: "no-store",
                }),
                fetch("/api/articles/cat", {
                    headers: {"Cache-Control": "no-cache"},
                    cache: "no-store",
                }),
            ]);

            if (!postsResponse.ok || !categoriesResponse.ok) {
                throw new Error("Ошибка загрузки данных");
            }

            const [postsData, categoriesData] = await Promise.all([
                postsResponse.json(),
                categoriesResponse.json(),
            ]);

            setPosts(postsData);
            setCategories(categoriesData);
            setProgress(100);
        } catch (error) {
            setError(error instanceof Error ? error.message : "Неизвестная ошибка");
            console.error("Ошибка загрузки данных:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (error) {
        return (
            <div className="w-screen h-screen flex items-center justify-center">
                <div className="text-red-500">{error}</div>
            </div>
        );
    }

    if (!posts || progress < 100) {
        return (
            <div className="w-screen h-screen flex items-center justify-center">
                <progress value={progress} max="100" className="w-1/2 md:w-1/3 lg:w-1/4"/>
            </div>
        );
    }

    const displayedPosts = showLimited
        ? posts.filter((post) => post.posttype?.includes("MAIN")).slice(0, 3)
        : posts.filter((post) => post.posttype?.includes("BASE"));

// Фильтрация по выбранной категории (если showLimited=false)
    const filteredPosts = selectedCategory
        ? displayedPosts.filter((post) => post.categories?.includes(selectedCategory))
        : displayedPosts;

    const handleCardClick = (title: string) => {
        const encodedTitle = encodeURIComponent(title);
        router.push(`/articles/${encodedTitle}`);
    };

    const handleCategoryClick = (categoryName: string) => {
        setSelectedCategory((prev) => (prev === categoryName ? null : categoryName));
    };

    return (
        <section className="w-full h-auto md:h-[600px] px-4 pt-10 pb-20 sm:pb-0 overflow-hidden">
    {/* Отображаем категории, если showLimited = false */}
    {!showLimited && (
        <div className="h-9 w-full flex my-6 gap-4 overflow-x-auto">
            {categories.map((category) => (
                <Button
                    key={category.id}
                    className={`px-4 py-2 rounded-md transition ${
                        selectedCategory === category.name
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 hover:bg-gray-300"
                    }`}
                    onClick={() => handleCategoryClick(category.name)}
                >
                    {category.name}
                </Button>
            ))}
        </div>
    )}

    {/* Отображаем посты */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 overflow-y-auto">
        {filteredPosts.map((post) => (
            <div
                key={post.id}
                onClick={() => handleCardClick(post.title)}
                className="cursor-pointer snap-center"
            >
                <PostsCard
                    author={post.title}
                    description={post.body}
                    title={post.title}
                    categories={post.categories || []}
                    image={post.image}
                />
            </div>
        ))}
    </div>
</section>
    );
}

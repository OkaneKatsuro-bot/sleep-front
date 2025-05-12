"use client";
import {use, useEffect, useState} from "react";
import {MdPreview} from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';
import {Badge} from "@/components/ui/badge";
import {Category} from "@/types/posts.type";
import {getPostByTitleAction} from "@/app/articles/action";
import {isSuccess} from "@/lib/isSuccessGuard";

export type Post = {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    title: string;
    body: string;
    published: boolean;
    authorId: string;
    categories?: Category[]; // Добавьте это поле
};


export default function Page({params}: { params: Promise<{ title: string }> }) {
    const {title} = use(params);
    const [article, setArticle] = useState<Post>();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchPost = async () => {
            try {
            //    const encodedTitle = encodeURIComponent(title);
                const res = await getPostByTitleAction(title);
                if (isSuccess(res)) {
                    setArticle(res.data);
                } else {
                    alert(res.message);
                }
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [title]);

    if (loading) {
        return <div>Загрузка...</div>; // Индикатор загрузки
    }

    if (error) {
        return <div>Ошибка: {error}</div>; // Сообщение об ошибке
    }

    if (!article) {
        return <div>Пост не найден</div>; // Сообщение, если пост не найден
    }

    return (
        <div className="max-w-4xl mx-auto py-8">
            <div className='flex flex-row gap-2'>
                {article.categories!.map((category: Category) => (
                    <Badge key={category.id} variant="outline">{category.name}</Badge> // Используем переменную category.name
                ))}
            </div>
            <MdPreview modelValue={article.body}/>
        </div>
    );
}

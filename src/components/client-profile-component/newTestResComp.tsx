"use client";


import React, {useEffect, useState, useMemo, useRef} from "react";

import {CardDescription} from "@/components/ui/card";
import {DoctorsComponent, MetodsComponent, ProductsComponent} from "./doctorscopmonent";
import {Disease, DiseaseToResult} from "@/types/test.types/testToUpdate.type";
import {Category, Post} from "@/types/posts.type";
import {Product} from "@/types/product.type";
import {Method} from "@/types/method.type";
import {SafeUser} from "@/types/safeuser.type";
import {NewChart} from "@/components/client-profile-component/newchart";
import {PostsResult} from "@/components/client-profile-component/postrsult";
import {checkMe} from "@/app/action";
import {getResultAction} from "@/components/client-profile-component/action";
import {isSuccess} from "@/lib/isSuccessGuard";

// Компонент для отображения диагноза и поста
function DiagnosisSection({maxDiagnosis, post}: { maxDiagnosis: Disease; post: Post | null }) {
    return (
        <div className="flex h-1/2 bg-white rounded-3xl flex-row shadow justify-between items-center p-3">
            <CardDescription className="flex flex-col gap-3 w-1/3 ml-4">
                Вы отлично постарались! 🎉 Ваш тест завершён, и результаты готовы.
                <strong>Ваше вероятное состояние:</strong>
                <span className="text-green-600 text-2xl">
                    {maxDiagnosis ? maxDiagnosis.title : "Неизвестный диагноз"}
                </span>
            </CardDescription>

            {post && (
                <PostsResult
                    author={post.title}
                    description={post.body}
                    title={post.title}
                    // categories={post.categories.map((category: { name: any; }) => category.name) || []}
                    image={post.image || ""} categories={[]}/>
            )}
        </div>
    );
}

interface NnewTestResCompProps {
    isOpenn: boolean; // Убедитесь, что тип здесь boolean
}

export default function NnewTestResComp({isOpenn}: NnewTestResCompProps) {
    const [result, setResult] = useState<string[] | null>(null);
    const [maxDiagnosis, setMaxDiagnosis] = useState<Disease>();
    const [user, setUser] = useState<SafeUser>();
    const [, setDisease] = useState<DiseaseToResult>();
    const [post, setPost] = useState<Post & { categories: Category[] } | null>(null);
    const [doctors, setDoctors] = useState<SafeUser[]>([]);
    const [metods, setMetods] = useState<Method[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const id = user?.id

    const checkAuth = async () => {
        try {
            const data = await checkMe();
            if (data.success && data.user) {
                setUser(data.user);
            } else {
                alert("<UNK>");
            }

        } catch (error) {
            console.error('Ошибка при проверки на вход:', error);
            throw error;
        }
    }
    useEffect(() => {
        checkAuth();
    }, []);

    // Состояние для управления видимостью компонента
    const [isOpen, setIsOpen] = useState(isOpenn);  // Используйте пропс isOpen напрямую

    const containerRef = useRef<HTMLDivElement | null>(null);

    // Получение информации для виджета
    const fetchInfoForWidget = async (diagnos: string) => {
        try {
            const res = await getResultAction(diagnos)
            if (isSuccess(res)) {
                if (res.disease) {
                    setDisease(res.disease);
                }
                setPost(res.disease.post);
                setDoctors(res.disease.assignedDoctor);
                setMetods(res.disease.Metod);
                setProducts(res.disease.Product);
            }
        } catch (err) {
            console.error("Ошибка при загрузке данных для виджета:", err);
        }
    };

    // Загрузка результата пользователя
    const fetchUserResult = async (userId: string) => {
        try {
            console.log("Fetching user result for:", userId);
            const cookieResult = localStorage.getItem("testResults");

            if (cookieResult) {
                try {
                    const parsedResult: string[] = JSON.parse(cookieResult);
                    setResult(parsedResult);
                    console.log("Loaded results from localStorage:", parsedResult);
                    return;
                } catch (error) {
                    console.error("Failed to parse localStorage data:", error);
                }
            }

            const response = await fetch("/api/user/newTestRes", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({id: userId}),
            });

            const data = await response.json();
            console.log("Fetched data from API:", data);

            if (data?.DisesesList) {
                setResult(data.DisesesList);
                localStorage.setItem("testResults", JSON.stringify(data.DisesesList));
            }
        } catch (error) {
            console.error("Error fetching user results:", error);
        }
    };

    // Мемоизация результата
    const parsedResult = useMemo(() => {
        if (!result) return [];
        return result
            .map((disease) => {
                try {
                    return typeof disease === 'string' ? JSON.parse(disease) : disease;
                } catch {
                    console.error("Failed to parse disease:", disease);
                    return null;
                }
            })
            .filter(Boolean);
    }, [result]);


    // Обновление диагноза на основе результатов
    useEffect(() => {
        if (parsedResult.length > 0) {
            const maxDiagnosis = parsedResult.reduce((max, current) =>
                current.score > max.score ? current : max
            );

            setMaxDiagnosis(maxDiagnosis);
            console.log('Вероятное сосотояние', maxDiagnosis);
            fetchInfoForWidget(maxDiagnosis.title);
        }
    }, [parsedResult]);

    const handleOutsideClick = (e: MouseEvent) => {
        if (!containerRef.current?.contains(e.target as Node)) {
            const formElement = document.querySelector(".no-close"); // Проверяем форму
            if (formElement && formElement.contains(e.target as Node)) return; // Если клик по форме — не закрываем

            setIsOpen(false);
        }
    };


    useEffect(() => {
        document.addEventListener("mousedown", handleOutsideClick);
        return () => document.removeEventListener("mousedown", handleOutsideClick);
    }, []);

    // Загрузка результатов при наличии id пользователя
    useEffect(() => {
        if (id) {
            fetchUserResult(id);
        }
    }, [id]);

    if (!isOpen) return null; // Не рендерим компонент, если он закрыт

    return (
        <div
            ref={containerRef}
            className="bg-neutral-300 h-[99%] w-[99%] rounded-3xl flex flex-row p-1"
        >
            <div className="flex flex-col w-1/2 h-full mr-3 gap-3">
                <div className="flex h-1/2">
                    <NewChart diseasesList={parsedResult} disise={maxDiagnosis?.title || ""}/>
                </div>
                {maxDiagnosis && (
                    <DiagnosisSection maxDiagnosis={maxDiagnosis} post={post}/>
                )}

            </div>
            <div className="flex flex-col w-1/2 gap-2 h-full">
                <DoctorsComponent doctors={doctors}/>
                <MetodsComponent metods={metods}/>
                <ProductsComponent products={products}/>
            </div>
        </div>
    );
}

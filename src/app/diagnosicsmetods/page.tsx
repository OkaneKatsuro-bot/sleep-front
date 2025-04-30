"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import React from "react";
import {Method} from "@/types/method.type";
import DoctorForm from "@/components/client-profile-component/doctorform";


export default function MetodsClient() {
    const [metods, setMetod] = React.useState<Method[]>([]);

    const fetchMetods = async () => {
        try {
            const res = await fetch("/api/methods");
            if (!res.ok) {
                throw new Error("Ошибка при загрузке данных");
            }
            const data: Method[] = await res.json(); // ✅ Парсим JSON
            setMetod(data); // ✅ Сохраняем в state
        } catch (error) {
            console.error("Ошибка при загрузке методов:", error);
        }
    };

// Вызываем fetchMetods при монтировании компонента
    React.useEffect(() => {
        fetchMetods();
    }, []);
    // Данные для карточек (можно заменить на реальные)


    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 p-12">
            {metods.map((method, index) => (
                <Card key={index} className="shadow-lg relative">
                    <CardHeader>
                        <CardTitle>{method.title}</CardTitle>
                        <CardDescription>{method.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className='flex flex-row'>
                            <div className='w-2/3'>{method.addeddescription}</div>
                            <img className='absolute right-4 top-4 max-w-40  aspect-square rounded-3xl'
                                 alt='фото метода' src={method.image}></img>
                        </div>

                    </CardContent>
                    <CardFooter>
                        <DoctorForm metod={method.title}/>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}

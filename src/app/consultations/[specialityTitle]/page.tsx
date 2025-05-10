'use client' // Указываем, что компонент является клиентским

import {useEffect, useState} from "react";
import {useParams} from 'next/navigation'
import Doctorslist from "@/components/clientconsulwidgets/doctorslist";
import CalendarWidget from "@/components/clientconsulwidgets/CalendarWidget";

export default function DoctorPage() {
    const params = useParams()
    const specialityTitle = params.specialityTitle as string | undefined

    const [isDoctor, setIsDoctor] = useState<boolean | null>(true);

    // useEffect(() => {
    //     if (!specialityTitle) return; // Если specialityTitle не найдено, не выполняем запрос
    //
    //     async function fetchUserIds() {
    //         try {
    //             const response = await fetch("/api/getUserIds");
    //             const userIds: string[] = await response.json();
    //             setIsDoctor(userIds.includes(specialityTitle as string)); // Преобразуем specialityTitle в строку
    //         } catch (error) {
    //             console.error("Ошибка загрузки ID пользователей:", error);
    //             setIsDoctor(false);
    //         }
    //     }
    //
    //     fetchUserIds();
    // }, [specialityTitle]);

    if (isDoctor === null) return <div>Загрузка...</div>;

    return isDoctor ? (
        <div className="container mx-auto p-8">
            <CalendarWidget doctorId={specialityTitle as string}/>
        </div>
    ) : (
        <Doctorslist specialityTitle={specialityTitle as string}/>
    );
}

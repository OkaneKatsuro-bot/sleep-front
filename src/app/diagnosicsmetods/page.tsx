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
import DoctorForm from "@/components/client-profile-component/doctorform";
import {getMethodsAction} from "@/components/admin-components/method-admin-component/action";
import {isSuccess} from "@/lib/isSuccessGuard";
import {MethodType} from "@/types/method.types/method.type";


export default function MetodsClient() {
    const [metods, setMetod] = React.useState<MethodType[]>([]);

    const fetchMetods = async () => {
        try {
            const res = await getMethodsAction()
            if (isSuccess(res)) {
                setMetod(res.methods)
            }
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
                        <CardTitle>{method.tittle}</CardTitle>
                        <CardDescription>{method.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className='flex flex-row'>
                            <div className='w-2/3'>{method.addeddescription}</div>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img className='absolute right-4 top-4 max-w-40  aspect-square rounded-3xl'
                                 alt='фото метода' src={method.image}></img>
                        </div>

                    </CardContent>
                    <CardFooter>
                        <DoctorForm metod={method.tittle}/>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}

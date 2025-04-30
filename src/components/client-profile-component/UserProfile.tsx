"use client";

import {Button} from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {useEffect, useState} from "react";
import {checkMe} from "@/app/action";
import {SafeUser} from "@/types/safeuser.type";
import NnewTestResComp from "@/components/client-profile-component/newTestResComp";

export function UserProfile() {

    const [user, setUser] = useState<SafeUser>();
    const [, setChartData] = useState<{ month: string; desktop: number }[]>([]);
    const [, setDataFetched] = useState(false);
    const [isWidgetOpen, setIsWidgetOpen] = useState(true); // Состояние для управления видимостью основного виджета
    const [isTestResultsWidgetOpen,] = useState(false); // Состояние для открытия/закрытия NnewTestResComp

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

    // Функция для загрузки данных
    const fetchData = async () => {
        if (!user) return;
        const id = user.id;

        const results = localStorage.getItem("testResult");

        try {
            const response = await fetch("/api/user/test", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({id, results}),
            });

            if (response.ok) {
                const result = await response.json();
                if (result?.diseasesList?.length > 0) {
                    const formattedData = result.diseasesList.map((item: string) => {
                        const parsedItem = JSON.parse(item);
                        return {month: parsedItem.title, desktop: parsedItem.score};
                    });
                    setChartData(formattedData);
                    setDataFetched(true);
                }
            }
        } catch (error) {
            console.error("Error loading chart data:", error);
        }
    };
    useEffect(() => {

        fetchData();
    }, []);

    return (
        <div className="flex flex-row w-screen h-full justify-between px-10 py-11">
            {/* Виджет, который будет отображаться поверх всех элементов */}
            {isWidgetOpen && (
                <div
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50"
                    onClick={() => setIsWidgetOpen(false)}
                >
                    <div
                        className="relative w-[90vw]  h-[90vh] bg-white rounded-3xl flex flex-col justify-center items-center p-6 shadow-lg"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <NnewTestResComp isOpenn={isWidgetOpen}/>
                    </div>
                </div>
            )}


            {/* Основной контент страницы */}
            <div className="flex flex-col mx-3 basis-1/2">
                <Tabs defaultValue="account" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="account">Аккаунт</TabsTrigger>
                        <TabsTrigger value="password">Пароль</TabsTrigger>
                    </TabsList>
                    <TabsContent value="account">
                        <Card>
                            <CardHeader>
                                <CardTitle>Аккаунт</CardTitle>
                                <CardDescription>
                                    Внесите изменения в свой аккаунт здесь. Нажмите &quot;Сохранить&quot;, когда
                                    закончите.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="space-y-1">
                                    <Label htmlFor="name">Имя</Label>
                                    <Input id="name" defaultValue=""/>
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="username">Имя пользователя</Label>
                                    <Input id="username" defaultValue=""/>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button>Сохранить изменения</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                    <TabsContent value="password">
                        <Card>
                            <CardHeader>
                                <CardTitle>Пароль</CardTitle>
                                <CardDescription>
                                    Измените свой пароль здесь. После сохранения вы будете выведены из
                                    системы.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="space-y-1">
                                    <Label htmlFor="current">Текущий пароль</Label>
                                    <Input id="current" type="password"/>
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="new">Новый пароль</Label>
                                    <Input id="new" type="password"/>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button>Сохранить пароль</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                </Tabs>

                {/* Кнопка для открытия/закрытия виджета с результатами */}
                <Button
                    className="mt-4"
                    onClick={() => setIsWidgetOpen((prev) => !prev)}
                >
                    {isTestResultsWidgetOpen ? "Закрыть виджет результатов" : "Открыть виджет результатов"}
                </Button>

            </div>

            <div className="flex flex-col mx-3 basis-1/2">
                <div
                    className="mt-8 w-full h-8 bg-red-600 rounded-3xl flex items-center justify-center text-stone-50 font-semibold"
                    //TODO: Сделать вызход из акк
                    // onClick={() => signOut({callbackUrl: "/"})}
                >
                    Выйти из аккаунта
                </div>
            </div>
        </div>
    );
}

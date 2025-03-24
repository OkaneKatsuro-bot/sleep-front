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
import {z} from "zod";
import {checkMe, uploadDoctorsAction} from "@/components/admin-components/main-admin-components/action";


export const createDoctorSchema = z.object({
    name: z.string().min(1, 'Имя обязательно'),
    surname: z.string().min(1, 'Фамилия обязательна'),
    email: z.string().min(1, 'Email обязателен').email('Некорректный email'),
    phone: z
        .string()
        .min(10, 'Телефон слишком короткий')
        .max(15, 'Телефон слишком длинный')
        .optional(), // если необязателен
    password: z.string().min(6, 'Пароль должен быть минимум 6 символов'),
    specialty: z.string().min(1, 'Специализация обязательна'),
    description: z.string().min(1, 'Описание обязательно'),
    image: z
        .instanceof(File)
        .refine(file => file.size > 0, 'Файл обязателен')
        .refine(file => file.type.startsWith('image/'), 'Файл должен быть изображением'),
});

export default function UsersTabs() {
    // const [currentPassword, setCurrentPassword] = useState("");
    // const [newPassword, setNewPassword] = useState("");
    // const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    // const {surname, id} = useUserStore();
    // const [image, setImage] = useState<File | null>(null);
    const [doctorData, setDoctorData] = useState({
        name: "",
        surname: "",
        specialty: "",
        image: null as File | null,
        email: "",
        phone: "",
        description: "",
        password: "",
    });

    useEffect(() => {
        checkHandle()
    }, []);

    // const handleSave = () => {
    //     console.log("Данные сохранены:", {name, nick});
    // };


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {id, value, files} = e.target;

        if (e.target.type === "file" && files) {
            setDoctorData(prev => ({...prev, [id]: files[0]}));
        } else {
            setDoctorData(prev => ({...prev, [id]: value}));
        }
    };

    const handleUploadDoctor = async () => {

        if (!doctorData.image) {
            alert("Пожалуйста, выберите изображение.");
            return;
        }

        const formData = new FormData();
        Object.entries(doctorData).forEach(([key, value]) => {
            if (value) {
                formData.append(key, value as string | Blob); // Добавляем только не пустые значения
            }
        });

        try {
            // Отправляем данные на сервер
            const res = await uploadDoctorsAction(formData);

            if (res.success) {
                alert("Доктор успешно добавлен!");
                // Очищаем форму после успешной отправки
                setDoctorData({
                    name: "",
                    surname: "",
                    specialty: "",
                    image: null,
                    email: "",
                    phone: "",
                    description: "",
                    password: "",
                });
            } else {
                console.error("Ошибка при получении данных:", res.message);
            }

        } catch (error) {
            console.error("Ошибка:", error);
            alert("Произошла ошибка при добавлении доктора.");
        }
    };

    const checkHandle = async () => {
        const data = await checkMe();

        if (data.success && data.user) {
            const { name, email } = data.user;

            if (name || email) {
                setName(name!);
                setEmail(email!);
            }
        }
    }

    // const handleUploadImage = async () => {
    //     if (!image) {
    //         alert("Пожалуйста, выберите изображение.");
    //         return;
    //     }
    //
    //     const formData = new FormData()
    //     formData.append("file", image);
    //     formData.append("id", id);
    //
    //     try {
    //         const response = await fetch("/api/upload", {
    //             method: "POST",
    //             body: formData
    //         });
    //
    //         if (response.ok) {
    //             const data = await response.json();
    //             alert(`Фото успешно загружено! ${data.fileUrl}`);
    //         } else {
    //             alert("Ошибка загрузки изображения.");
    //         }
    //     } catch (error) {
    //         console.error("Ошибка загрузки:", error);
    //         alert("Произошла ошибка при загрузке изображения.");
    //     }
    // };

    //handleSave()

    return (
        <Tabs defaultValue="account" className="w-[500px] h-max">
            <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="account">Аккаунт</TabsTrigger>
                <TabsTrigger value="password">Пароль</TabsTrigger>
                <TabsTrigger value="doctor">Добавить доктора</TabsTrigger>
            </TabsList>
            <TabsContent className="h-max" value="account">
                <Card>
                    <CardHeader>
                        <CardTitle>Аккаунт</CardTitle>
                        <CardDescription>
                            Измените данные своего аккаунта. Для подтверждения нажмите кнопку готово.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-7">
                        <div className="space-y-1">
                            <Label htmlFor="name">Имя</Label>
                            <Input
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="username">Почта</Label>
                            <Input
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder={''}
                            />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button>Готово</Button>
                    </CardFooter>
                </Card>
            </TabsContent>
            <TabsContent value="password">
                <Card>
                    <CardHeader>
                        <CardTitle>Пароль</CardTitle>
                        <CardDescription>
                            Измените пароль здесь. После изменения пароля вы выйдете из аккаунта.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-7">
                        <div className="space-y-1">
                            <Label htmlFor="current">Текущий пароль</Label>
                            <Input id="current" type="password"/>
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="new">Новый пароль</Label>
                            <Input id="new" type="password" placeholder={name}/>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button>Изменить пароль</Button>
                    </CardFooter>
                </Card>
            </TabsContent>

            <TabsContent value="doctor">
                <Card>
                    <CardHeader>
                        <CardTitle>Добавить доктора</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-7">
                        <div className="space-y-1">
                            <Label htmlFor="name">Имя</Label>
                            <Input
                                id="name"
                                type="text"
                                value={doctorData.name}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="surname">Фамилия</Label>
                            <Input
                                id="surname"
                                type="text"
                                value={doctorData.surname}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="specialty">Специальность</Label>
                            <Input
                                id="specialty"
                                type="text"
                                value={doctorData.specialty}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={doctorData.email}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="phone">Телефон</Label>
                            <Input
                                id="phone"
                                type="tel"
                                value={doctorData.phone}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="description">Описание</Label>
                            <Input
                                id="description"
                                type="text"
                                value={doctorData.description}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="password">Пароль</Label>
                            <Input
                                id="password"
                                type="password"
                                value={doctorData.password}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="image">Фото</Label>
                            <Input
                                id="image"
                                type="file"
                                accept="image/*"
                                onChange={handleInputChange}
                            />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button onClick={handleUploadDoctor}>Добавить доктора</Button>
                    </CardFooter>
                </Card>
            </TabsContent>
        </Tabs>
    );
}

"use client";

import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { Role } from "@/types/safeuser.type";
import {signUp} from "@/components/sign-up-components/actions";


const formSchema = z.object({
    name: z.string().min(1, "Имя обязательно"),
    surname: z.string().min(1, "Фамилия обязательна"),
    email: z.string().email("Введите корректную почту"),
    password: z.string().min(6, "Пароль должен быть не меньше 6 символов"),
});

export function SignUpForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            surname: "",
            email: "",
            password: "",
        },
    });

    const [isChecked, setIsChecked] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setLoading(true);
        setError("");

        const res = await signUp(values);

        if (!res.success) {
            setError(res.message || "Ошибка входа");
            setLoading(false);
            return;
        }

        switch (res.role) {
            case Role.ADMIN:
                router.push("/admin");
                break;
            case Role.DOCTOR:
                router.push("/doctor");
                break;
            default:
                router.push("/");
        }
    };

    return (
        <Card className="mx-auto max-w-sm">
            <CardHeader>
                <CardTitle className="text-xl">Регистрация</CardTitle>
                <CardDescription>
                    Введите информацию о себе для регистрации
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="grid gap-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Имя</Label>
                                <Input id="name" placeholder="Иван" {...form.register("name")} />
                                {form.formState.errors.name && (
                                    <div className="text-red-500 text-sm">
                                        {form.formState.errors.name.message}
                                    </div>
                                )}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="surname">Фамилия</Label>
                                <Input id="surname" placeholder="Иванов" {...form.register("surname")} />
                                {form.formState.errors.surname && (
                                    <div className="text-red-500 text-sm">
                                        {form.formState.errors.surname.message}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="m@example.com" {...form.register("email")} />
                            {form.formState.errors.email && (
                                <div className="text-red-500 text-sm">
                                    {form.formState.errors.email.message}
                                </div>
                            )}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="password">Пароль</Label>
                            <Input id="password" type="password" {...form.register("password")} />
                            {form.formState.errors.password && (
                                <div className="text-red-500 text-sm">
                                    {form.formState.errors.password.message}
                                </div>
                            )}
                        </div>

                        <div className="mt-4 text-xs flex flex-col items-center gap-2">
                            <div className="flex items-center gap-2">
                                <Checkbox
                                    id="terms"
                                    checked={isChecked}
                                    onCheckedChange={(checked) => setIsChecked(!!checked)}
                                />
                                <span>
                  Я ознакомился с{" "}
                                    <a
                                        href="/files/personal_data_policy.pdf"
                                        download="Политика_персональных_данных.pdf"
                                        className="underline text-primary cursor-pointer"
                                    >
                    Политикой обработки персональных данных
                  </a>{" "}
                                    и принимаю её условия.
                </span>
                            </div>
                        </div>

                        <Button type="submit" className="w-full" disabled={!isChecked || loading}>
                            {loading ? "Создание..." : "Создать аккаунт"}
                        </Button>

                        <Button variant="outline" className="w-full" >
                            <a href={`${process.env.NEXT_PUBLIC_API_URL}/auth/yandex/login`}>
                                Войти с помощью Яндекс
                            </a>
                        </Button>
                    </div>

                    <div className="mt-4 text-center text-sm">
                        Уже есть аккаунт?{" "}
                        <Link href="/signin" className="underline">
                            Войти
                        </Link>
                    </div>

                    {error && <div className="text-red-500 mt-2 text-sm text-center">{error}</div>}
                </form>
            </CardContent>
        </Card>
    );
}

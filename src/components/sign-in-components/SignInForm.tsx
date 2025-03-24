"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
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
import { loginAction } from "@/components/sign-in-components/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Role } from "@/types/safeuser.type";

const formSchema = z.object({
    email: z.string().email({ message: "Неверный email" }),
    password: z.string().min(6, { message: "Пароль слишком короткий." }),
});

export function LoginForm() {
    const router = useRouter();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setLoading(true);
        setError("");

        const res = await loginAction(values);

        if (!res.success) {
            setError(res.message || "Ошибка входа");
            setLoading(false);
            return;
        }else {
            if (res.role === 'ADMIN') {
                router.push("/admin");
            } else if (res.role === 'DOCTOR') {
                router.push("/");
            } else {
                router.push("/");
            }
        }
    };

    return (
        <Card className="mx-auto max-w-sm">
            <CardHeader>
                <CardTitle className="text-2xl">Вход</CardTitle>
                <CardDescription>
                    Введите свой email и пароль для входа в личный кабинет
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Почта</Label>
                            <Input id="email" type="email" {...form.register("email")} />
                            {form.formState.errors.email && (
                                <p className="text-sm text-red-500">
                                    {form.formState.errors.email.message}
                                </p>
                            )}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Пароль</Label>
                            <Input id="password" type="password" {...form.register("password")} />
                            {form.formState.errors.password && (
                                <p className="text-sm text-red-500">
                                    {form.formState.errors.password.message}
                                </p>
                            )}
                        </div>

                        {error && <div className="text-red-500 text-sm">{error}</div>}

                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? "Входим..." : "Войти"}
                        </Button>

                        <Link href="/">
                            <Button variant="outline" className="w-full">
                                Войдите с помощью Яндекс
                            </Button>
                        </Link>
                    </div>

                    <div className="mt-4 text-center text-sm">
                        Еще нет аккаунта?{" "}
                        <Link href="/signup" className="underline">
                            Зарегистрироваться
                        </Link>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}

import {Dialog, DialogContent, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import React, {useEffect, useState} from "react";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "./form"
import {Input} from "@/components/ui/input";
import InputMask from "react-input-mask";
import {toast} from "react-toastify";
import {Calendar} from "@/components/client-profile-component/calendar";
import {checkMe} from "@/app/action";
import {SafeUser} from "@/types/safeuser.type";


interface DoctorFormProps {
    metod: string;
}

export default function DoctorForm({metod}: DoctorFormProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState<SafeUser>()

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
    const authorId = user?.id


    const formSchema = z.object({
        date: z.date().min(
            new Date(new Date().setDate(new Date().getDate() + 1)),
            "Выберите дату не раньше завтрашнего дня"
        ),
        name: z.string().nonempty("Введите имя"),
        number: z
            .string()
            .nonempty("Введите номер телефона")
            .regex(/^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/, "Введите корректный номер телефона"),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            date: undefined,
            name: "",
            number: "+7",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        if (!authorId) {
            toast.error("Вы должны быть авторизованы, чтобы создать запись.");
            return;
        }

        try {
            const response = await fetch("/api/consul", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...values,
                    authorId,
                    metodForForm: metod // 🔥 Добавляем metodForForm
                }),
            });

            if (response.ok) {
                toast.success("Запись успешно создана!");
                form.reset();
                setIsOpen(false); // Закрываем диалог только после успешной отправки
            } else {
                toast.error("Ошибка при отправке формы. Попробуйте позже.");
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            toast.error("Произошла ошибка. Попробуйте позже.");
        }
    }


    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className="text-xl font-semibold">Записаться на консультацию</Button>
            </DialogTrigger>
            <DialogContent className="no-close">
                <DialogTitle>Форма записи</DialogTitle>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col">
                        <FormField
                            control={form.control}
                            name="date"
                            render={({field}) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Дата</FormLabel>
                                    <FormControl>
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={(date) => {
                                                if (date) {
                                                    field.onChange(date);
                                                }
                                            }}
                                            disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() + 1))}
                                            className="calendar-dropdown"
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="name"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Имя</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Введите имя" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="number"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Номер телефона</FormLabel>
                                    <FormControl>
                                        <InputMask mask="+7 (999) 999-99-99"
                                                   placeholder="+7 (___) ___-__-__" {...field}>
                                            {(inputProps) => <Input {...inputProps} />}
                                        </InputMask>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <Button type="submit" disabled={form.formState.isSubmitting}>
                            {form.formState.isSubmitting ? "Отправка..." : "Отправить"}
                        </Button>
                    </form>
                </Form>
            </DialogContent>

        </Dialog>
    );
}

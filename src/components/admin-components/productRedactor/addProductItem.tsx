"use client";

import {Dialog, DialogContent} from "@/components/ui/dialog";
import React, {useEffect, useState} from "react";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {Button} from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Product} from "@/types/product.type";

// 1. Схема формы
// z.coerce.number() — чтобы строка из инпута превращалась в число
const formSchema = z.object({
    price: z.coerce.number().min(0, "Цена не может быть отрицательной"),
    name: z.string().min(1, "Название не может быть пустым"),
});

export function ProductVariationDialog({
                                           isOpen,
                                           onClose,
                                           product,
                                       }: {
    isOpen: boolean;
    onClose: () => void;
    product: Product | null;
}) {
    // 2. Настраиваем форму
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            price: 0,
            name: "",
        },
    });

    // 3. Отправка на сервер (создание ProductItem)
    async function onSubmit(values: z.infer<typeof formSchema>) {
        if (!product?.id) {
            console.error("Нет ID продукта — нельзя создать вариацию");
            return;
        }

        try {
            // Формируем тело запроса для нового ProductItem
            const body = {
                price: values.price,
                complect: values.name,
                productId: product.id,
            };

            const response = await fetch("/api/products/createProductItem", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body),
            });

            if (!response.ok) {
                throw new Error(`Ошибка запроса: ${response.status}`);
            }

            // Допустим, сервер вернёт нам созданный объект или подтверждение
            const createdItem = await response.json();
            console.log("Создан новый ProductItem:", createdItem);

            // Закрываем диалог (и при необходимости перезагружаем список вариаций)
            onClose();
        } catch (error) {
            console.error("Ошибка при создании вариации:", error);
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        {/* Поле Price */}
                        <FormField
                            control={form.control}
                            name="price"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Цена</FormLabel>
                                    <FormControl>
                                        <Input placeholder="0" {...field} />
                                    </FormControl>
                                    <FormDescription>Цена вариации</FormDescription>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        {/* Поле Name (храним в БД как complect) */}
                        <FormField
                            control={form.control}
                            name="name"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Название вариации</FormLabel>
                                    <FormControl>
                                        <Input placeholder="" {...field} />
                                    </FormControl>
                                    <FormDescription>Название вариации</FormDescription>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <Button type="submit">Добавить</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

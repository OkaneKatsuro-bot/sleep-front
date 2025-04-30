'use client';

import {FormProvider, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import React from 'react';
import {Container} from "@/components/ui/container";
import {Title} from "@/components/ui/shared/title";
import {useCart} from "@/components/shop/hooks";
import {checkoutFormSchema, CheckoutFormValues,} from '@/lib/shop/checkout-form-schema';
import {shop, auth} from '@/api'
import {CheckoutAddressForm, CheckoutCart, CheckoutPersonalForm} from "@/components/shop/checkout";
import {CheckoutSidebar} from "@/components/shop/checkout/checkout-sidebar";


export default function CheckoutPage() {
    const [submitting, setSubmitting] = React.useState(false);
    const {totalAmount, updateItemQuantity, items, removeCartItem, loading} = useCart();

    const form = useForm<CheckoutFormValues>({
        resolver: zodResolver(checkoutFormSchema),
        defaultValues: {
            email: '',
            firstName: '',
            lastName: '',
            phone: '',
            address: '',
            comment: '',
        },
    });


    React.useEffect(() => {
        async function fetchUserInfo() {
            try {
                const data = await auth.getMeForShop();
                if (data?.name && data?.surname && data?.email) {
                    form.setValue('firstName', data.name);
                    form.setValue('lastName', data.surname);
                    form.setValue('email', data.email);
                } else {
                    throw new Error('Ошибка: Неполные данные пользователя');
                }
            } catch (error) {
                if (error instanceof Error) {
                    console.error('Ошибка при получении данных пользователя:', error.message);
                } else {
                    console.error('Неизвестная ошибка:', error);
                }
            }
        }

        fetchUserInfo();
    }, []);

    const onSubmit = async (data: CheckoutFormValues) => {
        try {
            setSubmitting(true);
           const { paymentUrl } = await shop.createOrder(data);
            console.log('👉 paymentUrl:', paymentUrl);
            window.location.href = paymentUrl;
        } catch (error) {
            console.error('❌ Ошибка при оформлении заказа:', error);
            toast.error('Не удалось создать заказ');
        } finally {
            setSubmitting(false);
        }
    };




    const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
        const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
        updateItemQuantity(id, newQuantity);
    };

    return (
        <Container className="mt-10">
            <Title text="Оформление заказа" className=" ml-10 font-extrabold mb-8 text-[36px]"/>

            <FormProvider {...form}>
                <form
                    onSubmit={(e) => {
                        e.preventDefault(); // ⛔️ отменяем дефолтный submit
                        form.handleSubmit(onSubmit)(e);
                    }}
                >
                    <div className="flex gap-10">
                        {/* Левая часть */}
                        <div className="flex flex-col gap-10 flex-1 mb-20">
                            <CheckoutCart
                                onClickCountButton={onClickCountButton}
                                removeCartItem={removeCartItem}
                                items={items}
                                loading={loading}
                            />

                            <CheckoutPersonalForm className={loading ? 'opacity-40 pointer-events-none' : ''}/>

                            <CheckoutAddressForm className={loading ? 'opacity-40 pointer-events-none' : ''}/>

                            <div className="w-[400px]">
                                <CheckoutSidebar totalAmount={totalAmount} loading={loading || submitting}/>
                            </div>
                        </div>

                        {/* Правая часть */}
                        {/* <div className="w-[450px]">
              <CheckoutSidebar totalAmount={totalAmount} loading={loading || submitting} />
            </div> */}
                    </div>
                </form>
            </FormProvider>
        </Container>
    );
}

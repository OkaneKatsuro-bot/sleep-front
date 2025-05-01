'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';

import { cn } from '@/lib/utils';

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet';
import { Button } from "@/components/shop/button";
import { Title } from "@/components/ui/shared/title";
import { useCart } from "@/components/shop/hooks";
import { CartDrawerItem } from "@/components/shop/cart-drawer-item";
import { getCartItemDetails } from "@/lib/shop/get-cart-item-details";

export const CartDrawer: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { totalAmount, updateItemQuantity, items, removeCartItem } = useCart();
  const [redirecting, setRedirecting] = React.useState(false);

  const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
    const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>

      <SheetContent className="flex flex-col justify-between p-0 bg-white">
        <div className={cn('flex flex-col h-full', !totalAmount && 'justify-center')}>
          {totalAmount > 0 && (
            <SheetHeader className="px-6 pt-6 pb-4 border-b border-gray-100">
              <SheetTitle className="text-2xl font-semibold text-gray-900">
                Корзина
                <span className="block mt-1 text-base font-normal text-gray-500">
                  {items.length} {items.length % 10 === 1 ? 'товар' : 'товаров'}
                </span>
              </SheetTitle>
            </SheetHeader>
          )}

          {!totalAmount && (
            <div className="flex flex-col items-center px-6 py-8">
              <div className="relative w-40 h-40 mb-6">
                <Image
                  src="/assets/images/empty-box.png"
                  alt="Empty cart"
                  fill
                  className="object-contain"
                />
              </div>
              <Title 
                size="lg" 
                text="Корзина пуста" 
                className="text-center font-bold mb-3 text-gray-900"
              />
              <p className="text-center text-gray-600 mb-6">
                Добавьте товары из каталога, чтобы продолжить
              </p>

              <SheetClose className="w-full">
                <Button
                  variant="outline"
                  className="w-full h-12 text-base gap-2"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Вернуться к покупкам
                </Button>
              </SheetClose>
            </div>
          )}
          {totalAmount > 0 && (
            <>
              <div className="flex-1 overflow-y-auto px-6 py-4">
                <div className="space-y-4">
                  {items.map((item) => (
                    <CartDrawerItem
                      key={item.id}
                      id={item.id}
                      imageUrl={item.imageUrl}
                      details={getCartItemDetails(item.ingredients)}
                      disabled={item.disabled}
                      name={item.name}
                      price={item.price}
                      quantity={item.quantity}
                      onClickCountButton={(type) =>
                        onClickCountButton(item.id, item.quantity, type)
                      }
                      onClickRemove={() => removeCartItem(item.id)}
                    />
                  ))}
                </div>
              </div>

              <SheetFooter className="bg-white border-t border-gray-100 px-6 py-6">
                <div className="w-full space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-lg text-gray-600">Итого:</span>
                    <span className="font-bold text-xl text-gray-900">
                      {totalAmount} ₽
                    </span>
                  </div>

                  <Link href="/checkout" className="block">
                    <Button
                      onClick={() => setRedirecting(true)}
                      loading={redirecting}
                      className="w-full h-12 text-base bg-blue-600 hover:bg-blue-700"
                    >
                      Оформить заказ
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                </div>
              </SheetFooter>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
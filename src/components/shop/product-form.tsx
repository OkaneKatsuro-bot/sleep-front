'use client';

import React from 'react';
import { toast } from 'react-hot-toast';
import { useCartStore } from '@/components/shop/store';
import { ProductFull } from '@/types/shop.types/shop.type';
import { ChooseProductForm } from '@/components/shop/choose-product-form';
import { ChooseItemsForm } from '@/components/shop/choose-items-form';

interface Props {
    product: ProductFull;
    onSubmit?: VoidFunction;
}

export const ProductForm: React.FC<Props> = ({ product, onSubmit: _onSubmit }) => {
    const addCartItem = useCartStore((state) => state.addCartItem);
    const loading = useCartStore((state) => state.loading);

    if (!product.items?.length) return <div>У товара нет вариаций</div>;

    const firstItem = product.ingredients[0];

    const onSubmit = async (productItemId?: number, ingredients?: number[]) => {
        try {
            const itemId = productItemId ?? firstItem.id;
            await addCartItem({ productItemId: itemId, ingredients });
            _onSubmit?.();
        } catch (err) {
            toast.error('Не удалось добавить товар в корзину');
            console.error(err);
        }
    };

    return product.items.length === 1 ? (
        <ChooseProductForm
            imageUrl={product.imageUrl}
            name={product.name}
            onSubmit={onSubmit}
            price={firstItem.price}
            loading={loading}
        />
    ) : (
        <ChooseItemsForm
            imageUrl={product.imageUrl}
            name={product.name}
            items={product.items}
            loading={loading}
            onSubmit={onSubmit}
        />
    );
};

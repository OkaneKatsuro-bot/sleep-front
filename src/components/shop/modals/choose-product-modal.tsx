'use client';

import React from 'react';
import {useRouter} from 'next/navigation';

import {ProductForm} from '../product-form';
import {cn} from '@/lib/utils';
import {Dialog, DialogContent, DialogTitle} from '@/components/ui/dialog';
import {ProductFull} from "@/types/shop.types/shop.type";


interface Props {
    product: ProductFull;
    className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({product, className}) => {
    const router = useRouter();

    return (
        <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
            <DialogContent
                className={cn(
                    'p-0 w-full max-w-[100%] h-auto max-h-[100vh] bg-white overflow-hidden',
                    className,
                )}
            >
                <DialogTitle></DialogTitle>
                <ProductForm product={product} onSubmit={() => router.back()}/>
            </DialogContent>
        </Dialog>
    );
};

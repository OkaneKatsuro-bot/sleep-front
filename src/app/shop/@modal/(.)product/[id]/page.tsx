import {Suspense} from 'react';
import {notFound} from 'next/navigation';
import {ChooseProductModal} from "@/components/shop/modals";
import {shop} from '@/api'

async function fetchProduct(id: number) {
    const product = await shop.getProductById(id);


    if (!product) {
        return notFound();
    }

    return product;
}

export default async function ProductModalPage({params: {id}}: { params: { id: number } }) {
    const product = await fetchProduct(id);

    return (
        <Suspense fallback={<div>Загрузка...</div>}>
            <ChooseProductModal product={product}/>
        </Suspense>
    );
}

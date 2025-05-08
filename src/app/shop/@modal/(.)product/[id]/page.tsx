// src/app/shop/@modal/(.)product/[id]/page.tsx.tsx
'use client' // Указываем, что это клиентский компонент

import {Suspense, useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {ChooseProductModal} from "@/components/shop/modals";
import {shop} from '@/api';

async function fetchProduct(id: number) {
    const product = await shop.getProductById(id);
    if (!product) {
        throw new Error('Product not found');
    }
    return product;
}

export default function ProductModalPage() {
    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();
    const {id} = router.query;

    useEffect(() => {
        if (id) {
            setLoading(true);
            setError(null);
            const fetchData = async () => {
                try {
                    const fetchedProduct = await fetchProduct(Number(id));
                    setProduct(fetchedProduct);
                } catch (err) {
                    setError('Продукт не найден');
                } finally {
                    setLoading(false);
                }
            };

            fetchData();
        }
    }, [id]);

    if (loading) {
        return <div>Загрузка...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <Suspense fallback={<div>Загрузка...</div>}>
            <ChooseProductModal product={product}/>
        </Suspense>
    );
}

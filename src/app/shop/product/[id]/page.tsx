'use client' // Указываем, что это клиентский компонент

import { Suspense, useEffect, useState } from 'react';
import { Container } from "@/components/ui/container";
import { ProductForm } from "@/components/shop/product-form";
import { shop } from '@/api';
import {useParams, useRouter} from 'next/navigation';


// Функция для получения данных о продукте
async function fetchProduct(id: number) {
    const product = await shop.getProductById(id);
    return product;
}

export default function ProductPage() {
    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const params = useParams();      // { id: string }
    const id = Number(params.id);
    const router = useRouter();// Получаем id из query (URL параметра)

    useEffect(() => {
        if (!id) return;  // Если id еще не доступен, ничего не делать

        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
                const productData = await fetchProduct(Number(id));  // Преобразуем id в число
                if (!productData) {
                    setError('Продукт не найден');
                } else {
                    setProduct(productData);
                }
            } catch (err) {
                setError('Ошибка загрузки данных');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);  // Эффект сработает, когда id изменится

    if (loading) {
        return <div>Загрузка...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!product) {
        return <div>Продукт не найден</div>;
    }

    return (
        <Container>
            <ProductForm product={product} />
        </Container>
    );
}

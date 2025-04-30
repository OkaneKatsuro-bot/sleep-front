export const dynamic = 'force-dynamic';

import { notFound } from 'next/navigation';
import { Container } from "@/components/ui/container";
import { ProductForm } from "@/components/shop/product-form";
import { shop } from '@/api';

async function fetchProduct(id: number) {
    const product = await shop.getProductById(id);
    return product;
}

export default async function ProductPage(context: { params: { id: string } }) {
    const { id } = context.params;
    const productId = Number(id);

    if (isNaN(productId)) return notFound();

    const product = await fetchProduct(productId);
    if (!product) return notFound();

    return (
        <Container>
            <ProductForm product={product} />
        </Container>
    );
}

"use client";

import React, {useEffect, useState} from "react";
import {Dialog, DialogContent} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";
import {Product} from "@/types/product.type";
import {Category} from "@/types/posts.type";
import {ProductItem} from "@/types/shop.types/shop.type";
import {ProductVariationDialog} from "@/components/admin-components/productRedactor/addProductItem";


interface ProductDialogProps {
    productProp: Product | null;
    isOpen: boolean;
    onClose?: () => void;
}

export default function ProductDetailDialog({
                                                productProp,
                                                isOpen,
                                                onClose,
                                            }: ProductDialogProps) {
    const [open, setOpen] = useState(isOpen);
    const [product, setProduct] = useState<Product | null>(productProp);
    const [category, setCategory] = useState<Category | undefined>();
    const [isOpenSecondDialog, setIsOpenSecondDialog] = useState<boolean>(false);
    const [productItems, setProductItems] = useState<ProductItem[]>([]);

    async function fetchCategories(id: number): Promise<Category | null> {
        try {
            const response = await fetch("/api/products/categories", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({id}),
            });

            if (!response.ok) {
                throw new Error(`Ошибка запроса: ${response.status}`);
            }

            const categoryData = await response.json();
            return categoryData;
        } catch (error) {
            console.error("Ошибка при загрузке категорий:", error);
            return null;
        }
    }

    async function fetchProductItems(id: number): Promise<ProductItem[]> {
        try {
            const response = await fetch(`/api/products/productsitems`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({id}),
            });

            if (!response.ok) {
                throw new Error(`Ошибка запроса: ${response.status}`);
            }

            // Предположим, что JSON всегда массив
            const items: ProductItem[] = await response.json();
            return items;
        } catch (error) {
            console.error("Ошибка при загрузке items:", error);
            // Возвращаем пустой массив при ошибке
            return [];
        }
    }

    useEffect(() => {
        setOpen(isOpen);
        setProduct(productProp);
        if (productProp?.id) {
            fetchProductItems(productProp.id).then((fetchedItems) => {
                setProductItems(fetchedItems);
            });
        } else {
            // Если нет ID – записываем пустой массив
            setProductItems([]);
        }


        if (productProp?.categoryId) {
            fetchCategories(productProp.categoryId).then((fetchedCat) => {
                setCategory(fetchedCat ?? undefined);
            });
        } else {
            setCategory(undefined);
        }
    }, [isOpen, productProp]);

    const handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen);
        if (!newOpen && onClose) {
            onClose();
        }
    };

    return (
        <>
            <Dialog open={open} onOpenChange={handleOpenChange}>
                <DialogContent>
                    {product ? (
                        <div className="flex flex-row w-full">

                            <div className="flex w-1/2 items-start justify-start flex-col gap-4">
                                <div className="relative w-60 h-60">
                                    <img
                                        src={product.imageUrl}
                                        alt={product.name}
                                        className="object-fill rounded-lg"
                                    />
                                </div>
                                <div className="text-xl font-semibold">{product.name}</div>
                                <Badge variant="outline">
                                    {category?.name || "Без категории"}
                                </Badge>
                            </div>


                            <div className="w-1/2 p-4">
                                <div className="max-h-60 overflow-y-auto">
                                    {productItems.map(item => (
                                        <div
                                            key={item.id}
                                            className="rounded-3xl border-2 flex flex-col items-start justify-center p-3 m-3"
                                        >
                                            <div>{item.price} руб</div>
                                            <div>{item.complect}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <Button
                                onClick={() => setIsOpenSecondDialog(true)}
                                className="absolute bottom-1 right-1"
                            >
                                Добавить вариацию товара
                            </Button>
                        </div>
                    ) : (
                        <div className="text-gray-500">Данные о товаре отсутствуют.</div>
                    )}
                </DialogContent>
            </Dialog>


            {isOpenSecondDialog && (
                <ProductVariationDialog
                    isOpen={isOpenSecondDialog}
                    onClose={() => setIsOpenSecondDialog(false)}
                    product={product}
                />
            )}
        </>
    );
}

"use client";

import React, {useState, useEffect} from "react";
import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";
import {Product} from "@/types/product.type";
import {Category2} from "@/types/shop.types/shop.type";
import ProductDetailDialog from "@/components/admin-components/productRedactor/productDatailCard";
import {getCategoriesAction, getProductsAction} from "@/components/admin-components/productRedactor/action";
import {isSuccess} from "@/lib/isSuccessGuard";


export default function DashboardProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category2[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            try {
                const categoriesRes = await getCategoriesAction();
                if (isSuccess(categoriesRes)) {
                    setCategories(categoriesRes.categories);
                }

                const productsRes = await getProductsAction();
                if (isSuccess(productsRes)) {
                    const productsData = productsRes.products;

                    setProducts(
                        productsData.map((product: any) => ({
                            ...product,
                            createdAt: new Date(product.createdAt),
                            updatedAt: new Date(product.updatedAt),
                            ingredients: product.ingredients ?? [],
                        }))
                    );
                } else {

                    setProducts([]);
                }
            } catch (error) {
                console.error("Ошибка загрузки:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);


    const handleDeleteProduct = async (id: number) => {
        if (!confirm("Вы уверены, что хотите удалить этот товар?")) return;

        try {
            await fetch(`/api/products`, {
                method: "DELETE",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({id}),
            });

            setProducts((prev) => prev.filter((p) => p.id !== id));
        } catch (error) {
            console.error("Ошибка:", error);
        }
    };

    if (loading) {
        return <div className="text-center p-8">Загрузка...</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-center mb-8">Управление товарами</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => {
                    const category = categories.find((c) => c.id === product.categoryId);

                    return (
                        <div
                            key={product.id}
                            className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
                            onClick={() => {
                                setSelectedProduct(product);
                                setIsOpen(true);
                            }}
                        >
                            <div className="relative aspect-square overflow-hidden rounded-t-xl">
                                {product.imageUrl && (
                                    <img
                                        src={product.imageUrl}
                                        alt={product.name}
                                        className="w-full h-full object-cover"
                                    />
                                )}
                            </div>

                            <div className="p-4 space-y-3">
                                <div className="flex justify-between items-start">
                                    <div className="text-xl font-bold">{product.name}</div>
                                    <Badge variant="outline">
                                        {category?.name || "Без категории"}
                                    </Badge>
                                </div>
                                <div className="flex gap-2 mt-4">
                                    <Button
                                        variant="destructive"
                                        className="flex-1"
                                        onClick={(e) => {
                                            e.stopPropagation(); // Останавливаем всплытие события
                                            handleDeleteProduct(product.id);
                                        }}
                                    >
                                        Удалить
                                    </Button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {isOpen && selectedProduct && (
                <ProductDetailDialog
                    productProp={selectedProduct}
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                />
            )}
        </div>
    );
}

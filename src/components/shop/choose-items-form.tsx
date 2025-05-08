"use client"

import React, {useState, useEffect} from "react";
import {Button} from "@/components/shop/button";
import {ProductItem} from "@/types/shop.types/shop.type";
import {cn} from "@/lib/utils";

interface ChooseItemsFormProps {
    imageUrl: string;
    name: string;
    items: ProductItem[];
    loading?: boolean;
    onSubmit: (itemId: number) => void;
}

export const ChooseItemsForm: React.FC<ChooseItemsFormProps> = ({
                                                                    imageUrl,
                                                                    name,
                                                                    items,
                                                                    loading,
                                                                    onSubmit,
                                                                }) => {
    const [selectedItemId, setSelectedItemId] = useState<number>(() => {
        return items.length > 0 ? items[0].id : -1;
    });

    useEffect(() => {
        if (items.length > 0 && !items.find(item => item.id === selectedItemId)) {
            setSelectedItemId(items[0].id);
        }
    }, [items]);

    const handleAdd = () => {
        if (selectedItemId !== -1) {
            onSubmit(selectedItemId);
        }
    };

    return (
        <div className="flex flex-col sm:flex-row h-full max-h-[90vh] bg-white rounded-xl overflow-hidden shadow-lg">
            {/* Левая часть: картинка */}
            <div className="sm:w-[40%] flex-shrink-0 flex items-center justify-center p-4 bg-gray-50 border-r">
                <img
                    src={imageUrl}
                    alt={name}
                    className="max-h-[240px] w-full object-contain mix-blend-multiply"
                />
            </div>

            {/* Правая часть: список вариаций */}
            <div className="sm:w-[60%] flex flex-col p-4 sm:p-5 h-full">
                <div className="mb-4">
                    <h2 className="text-lg font-bold text-gray-900">{name}</h2>
                    <p className="text-xs text-gray-500 mt-1">Выберите вариант товара</p>
                </div>

                <div className="flex-1 overflow-y-auto pr-1 -mr-1">
                    <div className="space-y-2">
                        {items.map((item) => (
                            <label
                                key={item.id}
                                className={cn(
                                    "flex items-start gap-3 p-3 border rounded-lg cursor-pointer",
                                    "transition-all hover:bg-gray-50",
                                    selectedItemId === item.id
                                        ? "border-blue-500 bg-blue-50 shadow-sm"
                                        : "border-gray-200"
                                )}
                            >
                                <input
                                    type="radio"
                                    name="productItem"
                                    value={item.id}
                                    checked={selectedItemId === item.id}
                                    onChange={(e) => setSelectedItemId(Number(e.target.value))}
                                    className="sr-only" // Скрываем нативный input
                                />
                                <div className="flex items-center h-5 mt-0.5">
                                    <div className={cn(
                                        "w-4 h-4 rounded-full border flex items-center justify-center",
                                        "transition-colors duration-200",
                                        selectedItemId === item.id
                                            ? "border-blue-600 bg-blue-600"
                                            : "border-gray-400 bg-white"
                                    )}>
                                        {selectedItemId === item.id && (
                                            <div className="w-1.5 h-1.5 bg-white rounded-full"/>
                                        )}
                                    </div>
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="text-sm text-gray-900 font-medium break-words">
                                        {item.complect || "Стандартная комплектация"}
                                    </div>
                                </div>

                                <div className="ml-3 flex-shrink-0">
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-base font-semibold text-gray-900">
                                            {item.price}
                                        </span>
                                        <span className="text-gray-500 text-xs">₽</span>
                                    </div>
                                </div>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Кнопка "Добавить в корзину" */}
                <div className="pt-4 mt-4 border-t border-gray-100">
                    <Button
                        disabled={loading || selectedItemId === -1}
                        onClick={handleAdd}
                        className="w-full h-12 text-sm font-medium rounded-lg bg-blue-600 hover:bg-blue-700"
                    >
                        {loading ? (
                            <span className="flex items-center gap-2">
                                <span className="animate-spin">↻</span>
                                Добавляем...
                            </span>
                        ) : (
                            <>
                                Добавить в корзину
                                <svg
                                    className="w-4 h-4 ml-2"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                    />
                                </svg>
                            </>
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
};
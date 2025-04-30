"use client";

import React, {useState} from "react";
import {Button} from "@/components/shop/button";
import {ProductItem} from "@/types/shop.types/shop.type";


// Пропсы — аналогично ChoosePizzaForm
interface ChooseItemsFormProps {
    imageUrl: string;
    name: string;
    items: ProductItem[];
    loading?: boolean;
    // onSubmit: (itemId: number) => void,
    // ... но у вас сигнатура с ingredients, пусть будет совместимая:
    onSubmit: (itemId: number) => void;
}

export const ChooseItemsForm: React.FC<ChooseItemsFormProps> = ({
                                                                    imageUrl,
                                                                    name,
                                                                    items,
                                                                    loading,
                                                                    onSubmit,
                                                                }) => {
    // Храним выбранный itemId
    const [selectedItemId, setSelectedItemId] = useState<number>(items[0].id);

    // При клике «Добавить»
    const handleAdd = () => {
        onSubmit(selectedItemId);
    };

    return (
        <div className="flex flex-col sm:flex-row">
            {/* Левая часть: картинка (по аналогии с ChoosePizzaForm) */}
            <div className="flex justify-center sm:w-[50%] w-full mb-5 sm:mb-0">
                <img src={imageUrl} alt={name} className="max-h-64 object-cover"/>
            </div>

            {/* Правая часть: список вариаций */}
            <div className="sm:w-[50%] bg-[#f7f6f5] p-7 flex flex-col h-[80vh] overflow-y-auto">
                <h2 className="text-xl font-bold mb-4">{name}</h2>
                <p className="text-gray-400">Выберите комплектацию или вариант товара</p>

                <div className="flex flex-col gap-3 mt-5">
                    {items.map((item) => (
                        <label
                            key={item.id}
                            className="flex items-center gap-3 p-3 border rounded-md cursor-pointer"
                        >
                            <input
                                type="radio"
                                name="productItem"
                                checked={selectedItemId === item.id}
                                onChange={() => setSelectedItemId(item.id)}
                            />
                            <span>{item.complect || "Без описания"}</span>
                            <span className="ml-auto">{item.price} ₽</span>
                        </label>
                    ))}
                </div>

                {/* Кнопка "Добавить в корзину" */}
                <Button
                    disabled={loading}
                    onClick={handleAdd}
                    className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10 mb-5"
                >
                    {loading ? "Загрузка..." : "Добавить в корзину"}
                </Button>
            </div>
        </div>
    );
};

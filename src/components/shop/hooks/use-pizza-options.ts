import React from 'react';
import {useSet} from 'react-use';
import {PizzaType} from "@/lib/shop/pizza";


interface ReturnProps {
    size: string;
    type: PizzaType;
    selectedIngredients: Set<number>;
    currentItemId?: number;
    setSize: (size: string) => void;
    setType: (size: PizzaType) => void;
    addIngredient: (id: number) => void;
}

export const usePizzaOptions = (): ReturnProps => {
    const [size, setSize] = React.useState<string>('');
    const [type, setType] = React.useState<PizzaType>(1);
    const [selectedIngredients, {toggle: addIngredient}] = useSet(new Set<number>([]));


    //const currentItemId = items.find((item) => item.pizzaType === type && item.size === size)?.id;


    return {
        size,
        type,
        selectedIngredients,
        //availableSizes,
        setSize,
        setType,
        addIngredient,
    };
};

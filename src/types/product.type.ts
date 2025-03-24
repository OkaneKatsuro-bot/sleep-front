import {Disease} from "@/types/test.types/testToUpdate.type";

export interface Product {
    id: number
    name: string
    imageUrl: string
    categoryId: number
    //category    : Category2
    // items       :ProductItem[]
    // ingredients :Ingredient[]
    Disease: Disease[]
}
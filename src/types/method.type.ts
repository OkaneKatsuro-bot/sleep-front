import {Disease} from "@/types/test.types/testToUpdate.type";

export interface Method {
    id: number
    title: string
    description: string
    addeddescription?: string
    image: string
    Disease: Disease[]
    [key: string]: unknown;

}
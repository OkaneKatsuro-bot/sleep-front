import {ConsulProductItem} from "@/types/calendar.types/ConsulProductItem";

export interface ConsulProduct {
id: number,
    description: string,
    doctorID: number,
    image?: string,
    price?: number,
    title?: string,
    consulProductItem: ConsulProductItem[]

}

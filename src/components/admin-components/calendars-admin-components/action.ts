import {ActionResult, handleAction} from "@/lib/handleAction";
import {SafeUser} from "@/types/safeuser.type";
import {admin} from "@/api";
import {ConsulProduct} from "@/types/calendar.types/ConsulProduct";
import {ConsulProductItem} from "@/types/calendar.types/ConsulProductItem";


export interface ConsultationSlot {
    dateStart: string; // ISO-строка даты начала
    dateEnd: string;   // ISO-строка даты окончания
}

export async function getAllDoctorsAction(): Promise<ActionResult<{ data: SafeUser[] }>> {
    return handleAction(async () => {
        const data = await admin.calendar.getAllDoctors() as SafeUser[];
        return {data}
    })
}

export async function getAllConsulProductAction(): Promise<ActionResult<{ data: ConsulProduct[] }>> {
    return handleAction(async () => {
        const data = await admin.calendar.getAllDoctorsProduct() as ConsulProduct[];
        return {data}
    })
}

export async function postConsulProductAction(formData: FormData): Promise<ActionResult<{ data: ConsulProduct }>> {
    return handleAction(async () => {
        const data = await admin.calendar.postConsulProduct(formData) as ConsulProduct;
        return {data}
    });
}

export async function getConsulItemByIdAction(
    id: number
): Promise<ActionResult<ConsulProductItem[]>> {
    return handleAction(async () => {
        const response = await admin.calendar.getConsulItemById(id) as { items: ConsulProductItem[] };
        return response.items;
    });
}



export async function submitSlotsAction(
    id: number,
    slotsToSend: ConsultationSlot[]
): Promise<ActionResult> {
    return handleAction(async () => {
        return await admin.calendar.postConsulItem(id, slotsToSend);
    });
}
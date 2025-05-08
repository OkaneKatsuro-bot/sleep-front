import {checkoutConsulValue} from "./checkout-consul-schema";
import {ActionResult, handleAction} from "@/lib/handleAction";
import {consultations} from '@/api'
import {Specs} from "@/components/clientconsulwidgets/speclist";
import {ConsulProductWithItems} from "@/components/clientconsulwidgets/CalendarWidget";


interface ApiResponse {
    url: { url: string };
}
export interface createConsulOrderProps {
    data: checkoutConsulValue,
    consulItemId: number,
}

export async function createConsulOrder(prop: createConsulOrderProps): Promise<ActionResult<{url: ApiResponse}>> {
    return handleAction(async () => {
        const url = await consultations.createOrder(prop) as ApiResponse
        return {url}
    })
}

export async function getDoctorsWSpecAction(): Promise<ActionResult<{ data: Specs[] }>> {
    return handleAction(async () => {
        const data = await consultations.getDoctorsWSpec() as Specs[]
        return {data}
    })
}

export async function getDoctorsByIdAction(doctorId: string): Promise<ActionResult<{
    data: ConsulProductWithItems[]
}>> {
    return handleAction(async () => {
        const data = await consultations.getDoctorsById(doctorId) as ConsulProductWithItems[]
        return {data}
    })
}


import {checkoutConsulValue} from "./checkout-consul-schema";
import {ActionResult, handleAction} from "@/lib/handleAction";
import {consultations} from '@/api'

export interface createConsulOrderProps {
    data: checkoutConsulValue,
    consulItemId: number,
}

export async function createConsulOrder(prop: createConsulOrderProps): Promise<ActionResult<{ url: string }>> {
    return handleAction(async () => {
        const url = await consultations.createOrder(prop) as string
        return {url}
    })
}


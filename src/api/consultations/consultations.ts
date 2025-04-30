import {fetcher} from "@/api/lib/fetcher";
import {checkoutConsulValue} from "@/components/clientconsulwidgets/checkout-consul-schema";

export interface createConsulOrderProps {
    data: checkoutConsulValue,
    consulItemId: number,
}

export async function getDoctors() {
    return await fetcher(`/consultations`);
}

export async function createOrder(prop: createConsulOrderProps) {
    return await fetcher(`/consultations/createOrder`, {
        method: "POST",
        body: JSON.stringify(prop),
    });
}
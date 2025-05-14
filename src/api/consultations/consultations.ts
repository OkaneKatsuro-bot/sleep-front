import {fetcher} from "@/api/lib/fetcher";
import {checkoutConsulValue} from "@/components/clientconsulwidgets/checkout-consul-schema";

export interface createConsulOrderProps {
    data: checkoutConsulValue,
    consulItemId: number,
}

export async function getDoctors() {
    return await fetcher(`/api/consultations`);
}

export async function createOrder(prop: createConsulOrderProps) {
    return await fetcher(`/api/consultations/order`, {
        method: "POST",
        body: JSON.stringify(prop),
    });
}

export async function getDoctorsWSpec() {
    return await fetcher(`/api/consultations/doctorsWSpec`, {})
}

export async function getDoctorsById(doctorId: string) {
    return await fetcher(`/api/consultations/doctors`, {
        method: "POST",
        body: JSON.stringify({ doctorId }),
    })
}
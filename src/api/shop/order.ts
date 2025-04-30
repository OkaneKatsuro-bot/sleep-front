import { CheckoutFormValues} from "@/lib/shop/checkout-form-schema";
import {fetcher} from "@/api/lib/fetcher";

export async function createOrder(data: CheckoutFormValues): Promise<{ paymentUrl: string }> {
    return await fetcher('/shop/create-order', {
        method: 'POST',
        body: JSON.stringify(data),
    });
}

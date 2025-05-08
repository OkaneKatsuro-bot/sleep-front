import {ActionResult, handleAction} from "@/lib/handleAction";
import {MethodType} from "@/types/method.types/method.type";
import {admin} from '@/api'

export async function getMethodsAction(): Promise<ActionResult<{ methods: MethodType[] }>> {
    return handleAction(async () => {
        const methods = await admin.methods.getMethods() as MethodType[];
        return {methods}
    })
}

export async function createMethodAction(formData: FormData): Promise<ActionResult> {
    return handleAction(async () => {
        return await admin.methods.createMethod(formData);
    })
}

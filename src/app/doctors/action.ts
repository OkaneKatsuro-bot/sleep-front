import {ActionResult, handleAction} from "@/lib/handleAction";
import {consultations} from '@/api'
import {SafeUser} from "@/types/safeuser.type";

export async function getDoctorsAction(): Promise<ActionResult<{ doctors: SafeUser[] }>> {
    return handleAction(async () => {
        const doctors = await consultations.getDoctors() as SafeUser[];
        return {doctors}
    })
}
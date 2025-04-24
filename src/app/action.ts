import {ActionResult, handleAction} from "@/lib/handleAction";
import {SafeUser} from "@/types/safeuser.type";
import {auth} from "@/api";

export async function checkMe(): Promise<ActionResult<{ user: SafeUser }>> {
    return handleAction(async () => {
        const user = await auth.getCurrentUser() as SafeUser;
        return {user};
    })
}
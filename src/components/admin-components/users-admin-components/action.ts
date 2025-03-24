import {ActionResult, handleAction} from "@/lib/handleAction";
import {admin} from "@/api";
import {userForTable} from "@/types/userForTable.type";
import {SafeUser} from "@/types/safeuser.type";


export async function getUsersAction(): Promise<ActionResult<{ users: userForTable[] }>> {
    return handleAction(async () => {
        const users = await admin.users.getUsers() as userForTable[];
        return {users}
    })
}

export async function deleteUserAction(userId: string): Promise<ActionResult<{ user: SafeUser }>> {
    return handleAction(async () => {
        const user = await admin.users.deleteUser(userId) as SafeUser;
        return {user}
    })
}

export async function readConsulAction(userId: string): Promise<ActionResult> {
    return handleAction(async () => {
        return await admin.users.readConsul(userId);
    })
}
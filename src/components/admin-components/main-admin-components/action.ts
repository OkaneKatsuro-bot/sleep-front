import {handleAction} from "@/lib/handleAction";
import {admin, auth} from "@/api";
import {SafeUser} from "@/types/safeuser.type";
import {ActionResult} from "@/lib/handleAction";
import {ViralityChartItem} from "@/types/chartData.type";




export async function getUsersAction(): Promise<ActionResult<{ users: SafeUser[] }>> {
    return handleAction(async () => {
        const users = await admin.users.getUsers() as SafeUser[];
        return {users};
    });
}

export async function getChartData(): Promise<ActionResult<{ chartData: ViralityChartItem[] }>> {
    return handleAction(async () => {
        const chartData = await admin.users.getChartData() as ViralityChartItem[];
        return {chartData};
    })
}

export async function uploadDoctorsAction(dto: FormData ): Promise<ActionResult<{ doctor: SafeUser[] }>> {
    return handleAction(async () => {
        const doctor = await admin.users.createDoctor(dto) as SafeUser[];
        return {doctor}
    })
}

export async function checkMe(): Promise<ActionResult<{ user: SafeUser}>> {
    return handleAction(async () => {
        const user = await auth.getCurrentUser() as SafeUser;
        return {user};
    })
}
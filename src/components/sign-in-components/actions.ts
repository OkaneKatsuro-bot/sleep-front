import {auth} from "@/api";


import { handleAction } from "@/lib/handleAction";

export async function loginAction(values: { email: string; password: string }) {
    return handleAction(async ({ email, password }) => {
        if (!email || !password) {
            return { success: false, message: "Email и пароль обязательны" };
        }

        const { user } = await auth.login(email, password);
        return { role: user.role };
    }, values);
}

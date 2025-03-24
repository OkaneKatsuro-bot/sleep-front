import {auth} from "@/api";
import {Role} from "@/types/safeuser.type";
import {ApiError} from "@/api/lib/fetcher";

export async function signUp(values: {name: string; surname:string, email: string; password: string}): Promise<{
    success: boolean,
    message?: string,
    role?: Role
}> {
    if (!values.name || !values.surname || !values.email || !values.password) {
        return {success: false, message: "Все поля обязательны"};
    }

    try {
        const {user} = await auth.signUp(values.name, values.surname, values.email, values.password);
        return {success: true, role: user.role};
    } catch (error) {
        if (error instanceof ApiError) {
            return {success: false, message: error.message};
        }
        console.error("Неизвестная ошибка входа:", error);
        return {success: false, message: "Что-то пошло не так, попробуйте позже"};
    }
}

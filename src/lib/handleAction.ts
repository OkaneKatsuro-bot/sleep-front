import {ApiError} from "@/api/lib/fetcher";

export type ActionResult<T = unknown> =
    | ({ success: true } & T)
    | { success: false; message: string };


type ActionHandler<TInput, TOutput = Record<string, unknown>> = (input: TInput) => Promise<TOutput>;

export async function handleAction<TInput = void, TOutput = Record<string, unknown>>(
    handler: ActionHandler<TInput, TOutput>,
    input?: TInput
): Promise<ActionResult<TOutput>> {
    try {
        const result = await handler(input as TInput);
        return { success: true, ...result };
    } catch (error) {
        if (error instanceof ApiError) {
            return { success: false, message: error.message };
        }

        console.error("Неизвестная ошибка:", error);
        return { success: false, message: "Что-то пошло не так, попробуйте позже" };
    }
}


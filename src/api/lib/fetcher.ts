export class ApiError extends Error {
    status: number;

    constructor(message: string, status: number) {
        super(message);
        this.status = status;
    }
}

export async function fetcher<T = unknown>(
    url: string,
    options: RequestInit = {}
): Promise<T> {
    // Внутри fetcher ожидаем, что url уже начинается с /api
    const headers = new Headers(options.headers);
    if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
        headers.set('Content-Type', 'application/json');
    }

    const res = await fetch(url, {
        ...options,
        credentials: 'include',
        headers,
        cache: 'no-store',
    });

    if (!res.ok) {
        let errorMessage = 'Ошибка запроса';
        try {
            const data = await res.json();
            errorMessage = data.message || errorMessage;
        } catch {}
        throw new ApiError(errorMessage, res.status);
    }

    return res.json();
}

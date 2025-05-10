import {fetcher} from "@/api/lib/fetcher";

export async function getResult(result: string) {
    return await fetcher('/users/result', {
        method: 'POST',
        body: JSON.stringify({result}),
    })
}
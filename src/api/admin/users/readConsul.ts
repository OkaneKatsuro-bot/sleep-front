import {fetcher} from "@/api/lib/fetcher";

export async function readConsul(userId: string) {
    return await fetcher('/admin/readConsul', {
        method: 'POST',
        body: JSON.stringify({userId})
    });
}
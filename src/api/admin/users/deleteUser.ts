import {fetcher} from "@/api/lib/fetcher";

export async function deleteUser(userId: string){
    return await fetcher('/admin/deleteUser', {
        method: 'DELETE',
        body: JSON.stringify({userId: userId})
    })
}
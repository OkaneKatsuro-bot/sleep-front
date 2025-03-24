import {fetcher} from "@/api/lib/fetcher";

export async function getUsers(){
    return fetcher('/admin/getUsers');
}
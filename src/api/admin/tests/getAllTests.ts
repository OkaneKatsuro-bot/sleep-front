import {fetcher} from "@/api/lib/fetcher";

export async function getAllTests(){
    return fetcher('/admin/tests/getAllTests');
}
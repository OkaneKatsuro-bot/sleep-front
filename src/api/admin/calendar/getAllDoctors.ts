import {fetcher} from "@/api/lib/fetcher";

export async function getAllDoctors(){
    return await fetcher('/admin/calendar/getAllDoctors');
}
import {fetcher} from "@/api/lib/fetcher";

export async function getAllDoctorsProduct() {
    return await fetcher('/admin/calendar/getAllDoctorProducts');
}
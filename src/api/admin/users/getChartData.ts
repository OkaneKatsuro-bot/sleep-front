import {fetcher} from "@/api/lib/fetcher";

export async function getChartData(){
    return await fetcher('/admin/getChartData');
}
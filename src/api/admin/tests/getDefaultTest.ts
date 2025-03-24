import {fetcher} from "@/api/lib/fetcher";

export async function getDefaultTest() {
    return  fetcher('/admin/tests/getDefaultTest');
}
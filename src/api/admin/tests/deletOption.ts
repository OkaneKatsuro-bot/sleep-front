import {fetcher} from "@/api/lib/fetcher";

export async function deleteOption(optionId: number) {
    return fetcher(`/api/admin/tests/deleteOption/${optionId}`)
}
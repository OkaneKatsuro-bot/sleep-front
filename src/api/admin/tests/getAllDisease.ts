import {fetcher} from "@/api/lib/fetcher";

export async function getAllDisease(testId: number) {
    return await fetcher(`/admin/tests/getAllDisease?testId=${testId}`)
}
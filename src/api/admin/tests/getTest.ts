import {fetcher} from "@/api/lib/fetcher";

export async function getTest(testId: number) {
    return await fetcher(`/admin/tests/getTest?testId=${testId}`)
}
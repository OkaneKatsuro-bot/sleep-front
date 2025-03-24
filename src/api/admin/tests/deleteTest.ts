import {fetcher} from "@/api/lib/fetcher";

export async function deleteTest(testId: number) {
    return fetcher(`/admin/tests/deleteTest/${testId}`,
        {
            method: "DELETE",
        })
}
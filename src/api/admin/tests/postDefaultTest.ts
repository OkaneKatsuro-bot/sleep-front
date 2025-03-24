import {fetcher} from "@/api/lib/fetcher";

export async function postDefaultTest(testID: number) {
    return fetcher(`/admin/tests/postDefaultTest/${testID}`, {
        method: 'PUT'
    })
}
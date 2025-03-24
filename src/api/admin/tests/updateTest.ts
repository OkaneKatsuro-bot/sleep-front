import {fetcher} from "@/api/lib/fetcher";
import {TestToUpdate} from "@/types/test.types/testToUpdate.type";

export async function updateTest(test: TestToUpdate) {
    return fetcher('/admin/test/updateTest', {
        method: 'PATCH',
        body: JSON.stringify(test),
    })
}
import {fetcher} from "@/api/lib/fetcher";
import {TestToCreate} from "@/types/test.types/testToUpdate.type";

export async function postTest(test: TestToCreate) {
    return fetcher('/admin/tests/createTest', {
        method: 'POST',
        body: JSON.stringify({
            test
        })
    })
}
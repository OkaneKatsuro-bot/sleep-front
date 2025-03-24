import {fetcher} from "@/api/lib/fetcher";
import {Options} from "@/components/admin-components/tests-admin-components/tests-redactor-component";

export async function getAllOptions(testId: number): Promise<Options[]> {

    return await fetcher(`/admin/tests/getAllOptions?testId=${testId}`);
}
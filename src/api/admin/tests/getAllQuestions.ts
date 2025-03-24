import {fetcher} from "@/api/lib/fetcher";
import {Questions} from "@/types/test.types/testToUpdate.type";


export async function getAllQuestions(testId: number): Promise<Questions[]> {
    return fetcher(`/admin/tests/getAllQuestions?testId=${testId}`);
}
import { fetcher } from "@/api/lib/fetcher";
import { GetDocAndPost } from "@/types/test.types/testToUpdate.type";

export async function getAllDataForTest(): Promise<GetDocAndPost> {
    return await fetcher('/admin/tests/getAllDataForTest');
}

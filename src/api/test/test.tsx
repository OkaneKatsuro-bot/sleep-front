import { fetcher } from "@/api/lib/fetcher";
import { FullTest } from "@/types/test.types/clientTest.type";

export async function getTest(url: string): Promise<FullTest> {
    const response = await fetcher(`/tests/getTest/${url}`) as { test: FullTest };
    return response.test;
}

import {fetcher} from "@/api/lib/fetcher";

export async function getDefTest(): Promise<{ deftest: string }> {
    return fetcher('/tests/getDef');
}

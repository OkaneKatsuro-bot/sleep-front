import { GetDocAndPostCreate} from "@/types/test.types/testToUpdate.type";
import {fetcher} from "@/api/lib/fetcher";

export async function postDocAndPostWidget(data: GetDocAndPostCreate) {
    return fetcher(`/admin/tests/postDocAndPostWidget/${data.id}`, {
        method: 'POST',
        body: JSON.stringify({data})
    })
}
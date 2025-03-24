import {fetcher} from "@/api/lib/fetcher";
import {OptionToCreate} from "@/types/test.types/testToUpdate.type";


export async function postOption(option: OptionToCreate) {
    return fetcher('/admin/tests/postOption', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            option
        })
    })
}

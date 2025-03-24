import {fetcher} from "@/api/lib/fetcher";
import {QuestionToCreate} from "@/types/test.types/testToUpdate.type";


export async function postQuest(question: QuestionToCreate) {
    return fetcher('/admin/tests/postQustion', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            question
        })
    })
}

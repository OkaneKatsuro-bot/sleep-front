import {fetcher} from "@/api/lib/fetcher";

export async function deleteQuestion(questionId: number) {
    return fetcher(`/admin/tests/deleteQuestion/${questionId}`,
        {
            method: "DELETE",
        })
}
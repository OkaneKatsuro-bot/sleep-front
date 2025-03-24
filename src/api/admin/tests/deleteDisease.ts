import {fetcher} from "@/api/lib/fetcher";

export async function deleteDisease(diseaseId: number) {
    return fetcher(`/admin/tests/deleteDisease/${diseaseId}`,
        {
            method: "DELETE",
        })
}
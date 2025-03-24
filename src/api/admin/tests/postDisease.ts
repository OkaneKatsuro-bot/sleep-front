import {DiseaseToCreate} from "@/types/test.types/testToUpdate.type";
import {fetcher} from "@/api/lib/fetcher";

export async function postDisease(disease: DiseaseToCreate) {
    await fetcher('/admin/tests/postDisease', {
        method: "POST",
        body: JSON.stringify({
            disease
        })
    })
}
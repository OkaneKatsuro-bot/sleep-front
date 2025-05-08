import {ActionResult, handleAction} from "@/lib/handleAction";
import {auth} from '@/api'
import {DiseaseToResult} from "@/types/test.types/testToUpdate.type";

export async function getResultAction(diagnos: string): Promise<ActionResult<{ disease: DiseaseToResult }>> {
    return handleAction(async () => {
        const disease = await auth.getResult(diagnos) as DiseaseToResult
        return {disease}
    })
}
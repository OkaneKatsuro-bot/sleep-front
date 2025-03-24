import {ActionResult, handleAction} from "@/lib/handleAction";
import {
    DiseaseToCreate,
    GetDocAndPost, GetDocAndPostCreate,
    OptionToCreate,
    QuestionToCreate,
    TestToCreate,
    TestToUpdate
} from "@/types/test.types/testToUpdate.type";
import {admin} from "@/api";
import {SafeUser} from "@/types/safeuser.type";
import {Method} from "@/types/method.type";
import {Product} from "@/types/product.type";
import {
    Questions,
    Options,
    Diseas
} from "@/components/admin-components/tests-admin-components/tests-redactor-component";


export async function getAllTestsAction(): Promise<ActionResult<{ tests: TestToUpdate[] }>> {
    return handleAction(async () => {
        const tests = await admin.tests.getAllTests() as TestToUpdate[];
        return {tests}
    })
}

export async function getDefaulttestAction(): Promise<ActionResult<{ test: TestToUpdate }>> {
    return handleAction(async () => {
        const test = await admin.tests.getDefaultTest() as TestToUpdate;
        return {test}
    })
}

export async function deleteTestAction(testId: number): Promise<ActionResult> {
    return handleAction(async () => {
        return await admin.tests.deleteTest(testId)
    })
}

export async function postDefaultTestAction(testId: number): Promise<ActionResult> {
    return handleAction(async () => {
        return await admin.tests.postDefaultTest(testId)
    })
}


export async function postTestAction(testNew: TestToCreate): Promise<ActionResult<{ test: TestToUpdate }>> {
    return handleAction(async () => {
        const test = await admin.tests.postTest(testNew) as TestToUpdate;
        return {test}
    })
}

export async function postQuestionAction(testId: number, questionText: string): Promise<ActionResult> {
    return handleAction(async () => {
        const playload: QuestionToCreate = {
            testId,
            text: questionText,
        }
        return await admin.tests.postQuest(playload)
    })
}

export async function postOptionAction(questionId: number, text: string, score: number, maxDisease: number[], minDisease: number[]): Promise<ActionResult> {
    return handleAction(async () => {
        const payload: OptionToCreate = {
            questionId,
            text,
            maxDisease,
            minDisease
        }
        return await admin.tests.postOption(payload);
    })
}

export async function getDocAndPOstAction(): Promise<ActionResult<{ data: GetDocAndPost }>> {
    return handleAction(async () => {
        const data = await admin.tests.getAllDataForTest() as GetDocAndPost;
        return {
            data
        }
    })
}

export async function deleteDiseaseAction(id: number): Promise<ActionResult> {
    return handleAction(async () => {
        return await admin.tests.deleteDisease(id)
    })
}

export async function deleteQuestionAction(id: number): Promise<ActionResult> {
    return handleAction(async () => {
        return await admin.tests.deleteQuestion(id)
    })
}

export async function postDiseaseAction(testId: number, title: string): Promise<ActionResult> {
    return handleAction(async () => {
        const payload: DiseaseToCreate = {
            testId,
            title,
        }
        return await admin.tests.postDisease(payload)
    })
}

export async function postDocAndPostWidgetAction(diseaseId: number, postId: number, desiesDoctor: SafeUser[], products: Product[], desiesMetodsList: Method[]) {
    return handleAction(async () => {
        const payload: GetDocAndPostCreate = {
            id: diseaseId,
            postId,
            doctors: desiesDoctor,
            products: products,
            methods: desiesMetodsList
        }
        return await admin.tests.postDocAndPostWidget(payload)
    })
}

export async function getQuestionAction(testId: number): Promise<ActionResult<{ data: Questions[] }>> {
    return handleAction(async () => {
        const data = await admin.tests.getAllQuestions(testId) as Questions[]
        return {data};
    });
}


export async function getOptionsAction(questionId: number): Promise<ActionResult<{ data: Options[] }>> {
    return handleAction(async () => {
        const data = await admin.tests.getAllOptions(questionId) as Options[]
        return {data};
    });
}

export async function getTestAction(testId: number): Promise<ActionResult<{ data: TestToUpdate }>> {
    return handleAction(async () => {
        const data = await admin.tests.getTest(testId) as TestToUpdate;
        return {data};
    })
}

export async function getDiseaseAction(id: number): Promise<ActionResult<{ data: Diseas[] }>> {
    return handleAction(async () => {
        const data = await admin.tests.getAllDisease(id) as Diseas[]
        return {data};
    })
}
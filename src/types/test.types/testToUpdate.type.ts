import {SafeUser} from "@/types/safeuser.type";
import {PostToUpdate} from "@/types/postToUpdate.type";
import {Method} from "@/types/method.type";
import {Post} from "@/types/posts.type";
import {Product} from "@/types/product.type";

export interface TestToUpdate {
    updatedAt: Date;
    createdAt: Date;
    id: number
    title?: string
    urltitle?: string
    defaultTest?: DefaultTest
    disease?: Disease[]
    questions?: Questions[]

}

export interface Disease {
    id: number
    title: string
    testId?: number
    postId?: number
    userId?: number
    post?: PostToUpdate
    test?: TestToUpdate
    User?: SafeUser
    assignedDoctor?: SafeUser[]
    OptionMax?: Option[]
    OptionMin?: Option[]
    //Product        Product[]
    Metod?: Method[]
    score?: number
}

export interface Option {
    id: number
    text?: string
    testId?: number
    options?: Option[]
    test?: TestToUpdate
}


export interface DefaultTest {
    id: number
    testTitle?: string
    test?: TestToUpdate
}


export interface Questions {
    id: number;
    text: string;
    testId: number;
    options: Option[];
}
export interface TestToCreate {
    title: string
    urltitle: string
}

export interface QuestionToCreate {
    text?: string
    testId?: number
    options?: Option[]
}


export interface OptionToCreate {
    questionId: number,
    text?: string
    maxDisease: number[],
    minDisease: number[],
}

export interface DiseaseToCreate {
    title?: string
    testId?: number
    postId?: number
    userId?: number
    post?: PostToUpdate
    test?: TestToUpdate
    User?: SafeUser
    assignedDoctor?: SafeUser[]
    OptionMax?: Option[]
    OptionMin?: Option[]
    //Product        Product[]
    Metod?: Method[]
}


export interface  GetDocAndPost{
    id: number,
    post: Post[],
    doctors: SafeUser[],
    products: Product[],
    methods: Method[],
}
export interface  GetDocAndPostCreate{
    id: number,
    postId: number,
    doctors: SafeUser[],
    products: Product[],
    methods: Method[],
}

export interface DiseaseToResult {
    id: number
    title: string
    postId: number
    post: Post
    test: TestToUpdate
    assignedDoctor: SafeUser[]
    Metod: Method[]
    score: number
    Product: Product[]
}
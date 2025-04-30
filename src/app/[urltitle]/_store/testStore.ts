import {create} from 'zustand';
import {test as testApi} from '@/api';


interface Disease {
    id: number;
    title: string;
    score: number;
}

interface QuestionOption {
    id: number;
    text: string;
    score: number;
    maxDisease?: Disease[];
    minDisease?: Disease[];
}

interface Question {
    id: number;
    text: string;
    options: QuestionOption[];
}

interface TestStore {
    testId: number;
    questions: Question[];
    diseases: Disease[];
    totalScores: { [diseaseId: number]: number };
    currentQuestionIndex: number;
    loadTest: (url: string) => void;
    answerQuestion: (option: QuestionOption) => void;
    nextQuestion: () => void;
    getFinalResults: () => { [title: string]: number };
    resetStore: () => void;
}

export const useTestStore = create<TestStore>((set, get) => ({
    testId: 0,
    questions: [],
    diseases: [],
    totalScores: {},
    currentQuestionIndex: 0,

    loadTest: async (url: string) => {
        try {
            const test = await testApi.getTest(url);

            if (!test || !test.questions || !test.questions.length) {
                throw new Error('Тест не найден или не содержит вопросов');
            }

            const diseasesMap = new Map<number, Disease>();

            const questions = test.questions.map((question) => ({
                id: question.id,
                text: question.text,
                options: (question.options || []).map((opt) => ({
                    id: opt.id,
                    text: opt.text || '',
                    score: opt.score ?? 0,
                    maxDisease: (opt.maxDisease || []).map((d) => ({
                        id: d.id,
                        title: d.title,
                        score: 0,
                    })),
                    minDisease: (opt.minDisease || []).map((d) => ({
                        id: d.id,
                        title: d.title,
                        score: 0,
                    })),
                })),
            }));

            questions.forEach((q) => {
                q.options.forEach((opt) => {
                    opt.maxDisease?.forEach((disease) => {
                        if (!diseasesMap.has(disease.id)) {
                            diseasesMap.set(disease.id, disease);
                        }
                    });
                    opt.minDisease?.forEach((disease) => {
                        if (!diseasesMap.has(disease.id)) {
                            diseasesMap.set(disease.id, disease);
                        }
                    });
                });
            });

            const diseases = Array.from(diseasesMap.values());

            set({
                testId: test.id,
                questions,
                diseases,
                totalScores: diseases.reduce((acc, disease) => {
                    acc[disease.id] = 0;
                    return acc;
                }, {} as { [diseaseId: number]: number }),
            });
        } catch (error) {
            console.error('Ошибка загрузки теста:', error);
        }
    },


    answerQuestion: (option: QuestionOption) => {
        set((state) => {
            const updatedScores = {...state.totalScores};

            console.log("Выбранный вариант:", option);

            // Добавляем баллы к maxDisease
            option.maxDisease?.forEach((disease) => {
                console.log(`Добавляем ${option.score} к диагнозу: ${disease.title}`);
                updatedScores[disease.id] = (updatedScores[disease.id] || 0) + option.score;
            });

            // Вычитаем баллы из minDisease
            option.minDisease?.forEach((disease) => {
                console.log(`Вычитаем ${option.score} из диагноза: ${disease.title}`);
                updatedScores[disease.id] = (updatedScores[disease.id] || 0) - option.score;
            });

            console.log("Обновленные очки:", updatedScores);

            return {
                totalScores: updatedScores,
            };
        });
    },

    nextQuestion: () => {
        set((state) => {
            if (state.currentQuestionIndex + 1 < state.questions.length) {
                return {currentQuestionIndex: state.currentQuestionIndex + 1};
            }
            return state; // Если вопросы закончились, не изменяем состояние
        });
    },

    getFinalResults: () => {
        const {totalScores, diseases} = get();
        const results: { [title: string]: number } = {};
        diseases.forEach((disease) => {
            results[disease.title] = totalScores[disease.id] || 0;
        });
        return results;
    },

    resetStore: () => set({
        questions: [],
        diseases: [],
        totalScores: {},
        currentQuestionIndex: 0,
    }),
}));

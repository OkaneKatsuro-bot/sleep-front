export interface FullTest {
    id: number;
    title: string;
    urltitle: string;
    createdAt: Date;
    updatedAt: Date;
    defaultTest?: {
        id: number;
        testTitle?: string;
        test?: FullTest;
    };
    diseases: {
        id: number;
        title: string;
        testId?: number;
        postId?: number;
        userId?: string;
        post?: {
            id: number;
            title: string;
            content: string;
            createdAt: Date;
            updatedAt: Date;
        };
        test?: FullTest;
        User?: {
            id: string;
            name?: string;
            email?: string;
            image?: string;
            role?: string;
        };
        assignedDoctor?: {
            id: string;
            name?: string;
            email?: string;
            image?: string;
            role?: string;
        }[];
        OptionMax?: {
            id: number;
            text?: string;
            questionId?: number;
            question?: {
                id: number;
                text: string;
                testId: number;
                options: {
                    id: number;
                    text?: string;
                    questionId?: number;
                    maxDisease?: {
                        id: number;
                        title: string;
                        testId?: number;
                        postId?: number;
                        userId?: string;
                        post?: {
                            id: number;
                            title: string;
                            content: string;
                            createdAt: Date;
                            updatedAt: Date;
                        };
                        User?: {
                            id: string;
                            name?: string;
                            email?: string;
                            image?: string;
                            role?: string;
                        };
                        assignedDoctor?: {
                            id: string;
                            name?: string;
                            email?: string;
                            image?: string;
                            role?: string;
                        }[];
                        OptionMax?: unknown[];  // можно уточнить, если нужно вложение опций
                        OptionMin?: unknown[];
                        Metod?: {
                            id: number;
                            title: string;
                            description?: string;
                            createdAt: Date;
                            updatedAt: Date;
                        }[];

                    }[];
                    minDisease?: {
                        id: number;
                        title: string;
                        testId?: number;
                        postId?: number;
                        userId?: string;
                        post?: {
                            id: number;
                            title: string;
                            content: string;
                            createdAt: Date;
                            updatedAt: Date;
                        };
                        User?: {
                            id: string;
                            name?: string;
                            email?: string;
                            image?: string;
                            role?: string;
                        };
                        assignedDoctor?: {
                            id: string;
                            name?: string;
                            email?: string;
                            image?: string;
                            role?: string;
                        }[];
                        OptionMax?: unknown[];
                        OptionMin?: unknown[];
                        Metod?: {
                            id: number;
                            title: string;
                            description?: string;
                            createdAt: Date;
                            updatedAt: Date;
                        }[];
                    }[];
                }[];
            };
            maxDisease?: {
                id: number;
                title: string;
                testId?: number;
                postId?: number;
                userId?: string;
                post?: {
                    id: number;
                    title: string;
                    content: string;
                    createdAt: Date;
                    updatedAt: Date;
                };
                User?: {
                    id: string;
                    name?: string;
                    email?: string;
                    image?: string;
                    role?: string;
                };
                assignedDoctor?: {
                    id: string;
                    name?: string;
                    email?: string;
                    image?: string;
                    role?: string;
                }[];
                OptionMax?: unknown[];
                OptionMin?: unknown[];
                Metod?: {
                    id: number;
                    title: string;
                    description?: string;
                    createdAt: Date;
                    updatedAt: Date;
                }[];
            }[];
            minDisease?: {
                id: number;
                title: string;
                testId?: number;
                postId?: number;
                userId?: string;
                post?: {
                    id: number;
                    title: string;
                    content: string;
                    createdAt: Date;
                    updatedAt: Date;
                };
                User?: {
                    id: string;
                    name?: string;
                    email?: string;
                    image?: string;
                    role?: string;
                };
                assignedDoctor?: {
                    id: string;
                    name?: string;
                    email?: string;
                    image?: string;
                    role?: string;
                }[];
                OptionMax?: unknown[];
                OptionMin?: unknown[];
                Metod?: {
                    id: number;
                    title: string;
                    description?: string;
                    createdAt: Date;
                    updatedAt: Date;
                }[];
            }[];
        }[];
        OptionMin?: {
            id: number;
            text?: string;
            questionId?: number;
            question?: {
                id: number;
                text: string;
                testId: number;
                options: {
                    id: number;
                    text?: string;
                    questionId?: number;
                    maxDisease?: {
                        id: number;
                        title: string;
                        testId?: number;
                        postId?: number;
                        userId?: string;
                        post?: {
                            id: number;
                            title: string;
                            content: string;
                            createdAt: Date;
                            updatedAt: Date;
                        };
                        User?: {
                            id: string;
                            name?: string;
                            email?: string;
                            image?: string;
                            role?: string;
                        };
                        assignedDoctor?: {
                            id: string;
                            name?: string;
                            email?: string;
                            image?: string;
                            role?: string;
                        }[];
                        OptionMax?: unknown[];
                        OptionMin?: unknown[];
                        Metod?: {
                            id: number;
                            title: string;
                            description?: string;
                            createdAt: Date;
                            updatedAt: Date;
                        }[];
                    }[];
                    minDisease?: {
                        id: number;
                        title: string;
                        testId?: number;
                        postId?: number;
                        userId?: string;
                        post?: {
                            id: number;
                            title: string;
                            content: string;
                            createdAt: Date;
                            updatedAt: Date;
                        };
                        User?: {
                            id: string;
                            name?: string;
                            email?: string;
                            image?: string;
                            role?: string;
                        };
                        assignedDoctor?: {
                            id: string;
                            name?: string;
                            email?: string;
                            image?: string;
                            role?: string;
                        }[];
                        OptionMax?: unknown[];
                        OptionMin?: unknown[];
                        Metod?: {
                            id: number;
                            title: string;
                            description?: string;
                            createdAt: Date;
                            updatedAt: Date;
                        }[];
                    }[];
                }[];
            };
            maxDisease?: {
                id: number;
                title: string;
                testId?: number;
                postId?: number;
                userId?: string;
                post?: {
                    id: number;
                    title: string;
                    content: string;
                    createdAt: Date;
                    updatedAt: Date;
                };
                User?: {
                    id: string;
                    name?: string;
                    email?: string;
                    image?: string;
                    role?: string;
                };
                assignedDoctor?: {
                    id: string;
                    name?: string;
                    email?: string;
                    image?: string;
                    role?: string;
                }[];
                OptionMax?: unknown[];
                OptionMin?: unknown[];
                Metod?: {
                    id: number;
                    title: string;
                    description?: string;
                    createdAt: Date;
                    updatedAt: Date;
                }[];
            }[];
            minDisease?: {
                id: number;
                title: string;
                testId?: number;
                postId?: number;
                userId?: string;
                post?: {
                    id: number;
                    title: string;
                    content: string;
                    createdAt: Date;
                    updatedAt: Date;
                };
                User?: {
                    id: string;
                    name?: string;
                    email?: string;
                    image?: string;
                    role?: string;
                };
                assignedDoctor?: {
                    id: string;
                    name?: string;
                    email?: string;
                    image?: string;
                    role?: string;
                }[];
                OptionMax?: unknown[];
                OptionMin?: unknown[];
                Metod?: {
                    id: number;
                    title: string;
                    description?: string;
                    createdAt: Date;
                    updatedAt: Date;
                }[];
            }[];
        }[];
        Metod?: {
            id: number;
            title: string;
            description?: string;
            createdAt: Date;
            updatedAt: Date;
        }[];
    }[];
    questions: {
        id: number;
        text: string;
        testId: number;
        options: {
            score?: number;
            id: number;
            text?: string;
            questionId?: number;
            maxDisease?: {
                id: number;
                title: string;
                testId?: number;
                postId?: number;
                userId?: string;
                post?: {
                    id: number;
                    title: string;
                    content: string;
                    createdAt: Date;
                    updatedAt: Date;
                };
                User?: {
                    id: string;
                    name?: string;
                    email?: string;
                    image?: string;
                    role?: string;
                };
                assignedDoctor?: {
                    id: string;
                    name?: string;
                    email?: string;
                    image?: string;
                    role?: string;
                }[];
                OptionMax?: unknown[];
                OptionMin?: unknown[];
                Metod?: {
                    id: number;
                    title: string;
                    description?: string;
                    createdAt: Date;
                    updatedAt: Date;
                }[];
            }[];
            minDisease?: {
                id: number;
                title: string;
                testId?: number;
                postId?: number;
                userId?: string;
                post?: {
                    id: number;
                    title: string;
                    content: string;
                    createdAt: Date;
                    updatedAt: Date;
                };
                User?: {
                    id: string;
                    name?: string;
                    email?: string;
                    image?: string;
                    role?: string;
                };
                assignedDoctor?: {
                    id: string;
                    name?: string;
                    email?: string;
                    image?: string;
                    role?: string;
                }[];
                OptionMax?: unknown[];
                OptionMin?: unknown[];
                Metod?: {
                    id: number;
                    title: string;
                    description?: string;
                    createdAt: Date;
                    updatedAt: Date;
                }[];
            }[];
        }[];
    }[];
}

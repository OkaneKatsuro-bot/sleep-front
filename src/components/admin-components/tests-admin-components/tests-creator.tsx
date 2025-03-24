'use client'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
} from "@/components/ui/breadcrumb";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import React, {useEffect, useState} from "react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {useTestEditorStore} from "@/components/admin-components/tests-admin-components/_testsStore";
import {TestTable} from "@/components/admin-components/tests-admin-components/tests-table-component";
import {TestRedactor} from "@/components/admin-components/tests-admin-components/tests-redactor-component";
import {isSuccess} from "@/lib/isSuccessGuard";
import {
    getAllTestsAction,
    getDefaulttestAction,
    postDefaultTestAction, postTestAction
} from "@/components/admin-components/tests-admin-components/action";

import {DefaultTest, TestToCreate, TestToUpdate} from "@/types/test.types/testToUpdate.type";


export function TestCreator() {
    const [testName, setTestName] = useState("");
    const [testUrl, setTestUrl] = useState("");
    const [defTest, setDefTest] = useState<DefaultTest>();
    const [tests, setTests] = useState<TestToUpdate[]>([]);
    const [selectedTest, setSelectedTest] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);

    const {isCreatingTest, createdTest, setIsCreatingTest, setCreatedTest} = useTestEditorStore();

    const fetchDefaultTest = async () => {
        try {
            const res = await getDefaulttestAction();
            if (isSuccess(res)) {
                setDefTest(res.test);
            } else {
                alert(res.message);
            }
        } catch (error) {
            console.error("Ошибка при получении данных:", error);
        }
    };


    useEffect(() => {

        const getAllTestsHandle = async () => {
            try {
                const res = await getAllTestsAction();
                if (isSuccess(res)) {
                    setTests(res.tests);
                } else {
                    alert(res.message);
                }
            } finally {
                setLoading(false);
            }

        }
        fetchDefaultTest();
        getAllTestsHandle();
    }, []);

    const handleSave = async () => {
        if (selectedTest === null) {
            alert("Пожалуйста, выберите тест");
            return;
        }

        setLoading(true);

        try {
            const res = await postDefaultTestAction(selectedTest)
            if (isSuccess(res)) {
                alert("Основной тест успешно обновлён");
                fetchDefaultTest();
            } else {
                alert(res.message);
            }
        } catch (error) {
            console.error("Ошибка при сохранении основного теста:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (!testName || !testUrl) {
            alert("Пожалуйста, заполните все поля");
            setLoading(false);
            return;
        }

        try {
            const res = await postTestAction({ urltitle: testUrl,
                title: testName, } as TestToCreate)
            if (isSuccess(res)) {
                setCreatedTest(res.test);
                setTestName("");
                setTestUrl("");
                alert("Тест успешно создан");
                setIsCreatingTest(true);
            }


        } catch (error) {
            console.error("Ошибка:", error);
        } finally {
            setLoading(false);
        }
    };

    return (


        <section className="relative flex flex-col  h-screen">
            {isCreatingTest ? (
                <TestRedactor
                    test={createdTest}
                    onClose={() => {
                        setIsCreatingTest(false);
                        setCreatedTest(null);
                    }}
                />
            ) : (
                <div>
                    <div className='absolute right-0 top-0 pt-10'>

                        <Dialog>
                            <DialogTrigger asChild>
                                <Button size="lg">Основной тест</Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>Выбор основного теста</DialogTitle>
                                    <DialogDescription>
                                        Выберите тест из списка, чтобы сделать его основным.
                                    </DialogDescription>
                                </DialogHeader>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline">{defTest?.testTitle || "Тест не выбран"}</Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-56">
                                        <DropdownMenuRadioGroup
                                            value={selectedTest ? selectedTest.toString() : ""}
                                            onValueChange={(value) => setSelectedTest(Number(value))} // Устанавливаем ID выбранного теста
                                        >
                                            {tests.length > 0 ? (
                                                tests.map((test) => (
                                                    <DropdownMenuRadioItem
                                                        key={test.id}
                                                        value={test.id.toString()}
                                                    >
                                                        {test.title}
                                                    </DropdownMenuRadioItem>
                                                ))
                                            ) : (
                                                <DropdownMenuRadioItem value="no-tests" disabled>
                                                    Нет созданных тестов
                                                </DropdownMenuRadioItem>
                                            )}
                                        </DropdownMenuRadioGroup>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                <DialogFooter>
                                    <Button onClick={handleSave} disabled={loading}>
                                        {loading ? "Сохранение..." : "Сохранить"}
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button size='lg'>Создать тест</Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>Создание теста</DialogTitle>
                                    <DialogDescription>
                                        Введите название теста и желаемый отображаемый адрес
                                    </DialogDescription>
                                </DialogHeader>
                                <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="name" className="text-right">
                                            Название
                                        </Label>
                                        <Input
                                            id="name"
                                            value={testName}
                                            onChange={(e) => setTestName(e.target.value)}
                                            required
                                            className="col-span-3"
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="username" className="text-right">
                                            URL
                                        </Label>
                                        <Input
                                            id="username"
                                            value={testUrl}
                                            onChange={(e) => setTestUrl(e.target.value)}
                                            required
                                            className="col-span-3"
                                        />
                                    </div>
                                    <DialogFooter>
                                        <Button type="submit" disabled={loading}>
                                            {loading ? "Создание..." : "Создать тест"}
                                        </Button>
                                    </DialogFooter>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>

                    <div className="h-max flex items-center pt-5 ">
                        <Breadcrumb className='px-5'>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbLink href="/public">Список тестов</BreadcrumbLink>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                    <div className="flex space-x-20 w-full pt-12 px-4">
                        <TestTable/>
                    </div>
                </div>
            )}
        </section>

    );
}

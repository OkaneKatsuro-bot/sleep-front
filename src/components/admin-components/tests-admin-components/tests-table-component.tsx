import {
    Table,
    TableBody,

    TableCell,

    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import * as React from "react";
import {format} from "date-fns";
import {Button} from "@/components/ui/button";
import {useTestEditorStore} from "@/components/admin-components/tests-admin-components/_testsStore";
import {deleteTestAction, getAllTestsAction} from "@/components/admin-components/tests-admin-components/action";
import {isSuccess} from "@/lib/isSuccessGuard";
import {TestToUpdate} from "@/types/test.types/testToUpdate.type";


export interface Tests {
    id: number;
    title: string;
    urltitle: string;
    questions: never[];
    createdAt: string;
    updatedAt: string;
}

export function TestTable() {
    const [tests, setTests] = React.useState<TestToUpdate[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const getAllTestsHandle = async () => {
            try{
                const res= await getAllTestsAction();
                if (isSuccess(res)) {
                    setTests(res.tests);
                } else {
                    alert(res.message);
                }
            } finally {
                setLoading(false);
            }

        }

        getAllTestsHandle();
    }, []);

    const handleDeleteClick = async (testId: number) => {
        try{
            setLoading(true);
            const res = await deleteTestAction(testId);
            if (isSuccess(res)) {
                setTests(tests.filter(test => test.id !== testId));
                setLoading(false);
            } else {
                alert(res.message);
            }
        }
         catch (error) {
            console.error("Ошибка при удалении теста:", error);
        }
    };


    const {setIsCreatingTest, setCreatedTest} = useTestEditorStore();

    const handleEditClick = (test: TestToUpdate) => {
        setCreatedTest(test);
        setIsCreatingTest(true);
    };
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Название</TableHead>
                    <TableHead>Количество вопросов</TableHead>
                    <TableHead>Дата создания</TableHead>
                    <TableHead className="text-right">Дата обновления</TableHead>
                    <TableHead>Удалить</TableHead>
                    <TableHead>Редактировать</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {!loading && tests.length > 0 ? (
                    tests.map((test) => (
                        <TableRow key={test.id}>
                            <TableCell className="font-medium">{test.title}</TableCell>
                            <TableCell>{test.questions ? test.questions.length : 0}</TableCell>
                            <TableCell>{format(new Date(test.createdAt), "dd.MM.yyyy HH:mm")}</TableCell>
                            <TableCell
                                className="text-right">{format(new Date(test.updatedAt), "dd.MM.yyyy HH:mm")}</TableCell>
                            <TableCell>
                                <Button variant="destructive" size="sm" onClick={() => handleDeleteClick(test.id)}>
                                    Удалить
                                </Button>
                            </TableCell>
                            <TableCell>
                                <Button size="sm" onClick={() => handleEditClick(test)}>Редактировать</Button>
                            </TableCell>
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={6} className="text-center">
                            {loading ? "Загрузка..." : "Нет данных"}
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}

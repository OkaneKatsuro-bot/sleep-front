import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table";
import {
    deleteUserAction,
    getUsersAction,
    readConsulAction
} from "@/components/admin-components/users-admin-components/action";
import {useEffect, useState} from "react";
import {isSuccess} from "@/lib/isSuccessGuard";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription} from "@/components/ui/dialog";
import {userForTable} from "@/types/userForTable.type";
import {CircleAlert} from "lucide-react";
import {Button} from "@/components/ui/button";


export const columns: (
    setDialogData: React.Dispatch<React.SetStateAction<userForTable["consul"] | null>>,
    setDialogUserId: React.Dispatch<React.SetStateAction<string | null>>,
    handleDeleteUser: (userId: string) => void
) => ColumnDef<userForTable>[] = (setDialogData, setDialogUserId, handleDeleteUser) => [
    {
        accessorKey: "name",
        header: "Имя",
        cell: ({row}) => <div>{row.getValue("name")}</div>,
    },
    {
        accessorKey: "surname",
        header: "Фамилия",
        cell: ({row}) => <div>{row.getValue("surname")}</div>,
    },
    {
        accessorKey: "email",
        header: "Email",
        cell: ({row}) => <div>{row.getValue("email")}</div>,
    },
    {
        accessorKey: "consul",
        header: "Сообщения",
        cell: ({row}) => {
            const messages: userForTable["consul"] = row.getValue("consul") || [];
            const unreadMessages = messages.filter((message) => !message.isRead);

            return (
                <div className='flex flex-row items-center justify-start'>
                    <span>Всего сообщений: {messages.length}</span>
                    {unreadMessages.length > 0 && (
                        <CircleAlert color='red'/>
                    )}
                </div>
            );
        },
    },
    {
        id: "actions",
        cell: ({row}) => {
            const user = row.original;
            return (
                <div className="flex gap-2">
                    <Button
                        onClick={() => {
                            setDialogData(user.consul);
                            setDialogUserId(user.id);
                        }}
                    >
                        Посмотреть обращения
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={() => handleDeleteUser(user.id)}
                    >
                        Удалить
                    </Button>
                </div>
            );
        },
    },
];


export default function UserTable() {

    const [users, setUsers] = useState<userForTable[]>([])
    const [dialogData, setDialogData] = useState<userForTable["consul"] | null>(null);
    const [dialogUserId, setDialogUserId] = useState<string | null>(null);
    const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

    const getAllUsersHandle = async () => {
        const res = await getUsersAction();
        if (isSuccess(res)) {
            setUsers(res.users);
        } else {
            alert(res.message);
        }
    }

    const deleteUserHandle = async (userId: userForTable["id"]) => {
        const res = await deleteUserAction(userId);
        if (isSuccess(res)) {
            alert('Пользователь успешно удален!');
            await getAllUsersHandle();
        } else {
            alert(res.message);
        }
    }

    const readConsulHandle = async (userId: userForTable["id"]) => {
        const res = await readConsulAction(userId);
        if (isSuccess(res)) {
            console.log('Сообщение прочитано!');
        } else {
            alert(res.message);
        }
    }

    const table = useReactTable({
        data: users,
        columns: columns(setDialogData, setDialogUserId, deleteUserHandle),
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        state: {
            pagination: {
                pageSize: 10,
                pageIndex: 0,
            },
        },
    });

    useEffect(() => {
        getAllUsersHandle();
    }, [])

    return (
        <section>
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <TableHead key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={table.getHeaderGroups()[0].headers.length}>
                                Нет данных.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            <div className="flex items-center justify-start p-2 gap-6">
                <Button
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Предыдущая
                </Button>
                <span>
                         {table.getState().pagination.pageIndex + 1} из{" "}
                    {table.getPageCount()}
                    </span>
                <Button
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Следующая
                </Button>
            </div>

            <Dialog
                open={!!dialogData}
                onOpenChange={async (open) => {
                    console.log("onOpenChange вызван с состоянием:", open);

                    if (!open) {

                        if (dialogUserId) {
                            console.log("Выполняем handleReadConsul при закрытии для ID:", dialogUserId);
                            await readConsulHandle(dialogUserId);
                            await getAllUsersHandle();
                        } else {
                            console.error("dialogUserId отсутствует!");
                        }

                        setDialogData(null);
                    }
                }}
            >
                <DialogContent>

                    <DialogHeader>
                        <DialogTitle>Текст обращения</DialogTitle>
                        <DialogDescription>
                            {dialogData && dialogData.length > 0 ? (
                                <div>
                                    <div>
                                        <strong>Дата:</strong> {new Date(dialogData[currentMessageIndex].date).toLocaleDateString()}
                                    </div>
                                    <div><strong>Имя:</strong> {dialogData[currentMessageIndex].name}</div>
                                    <div><strong>Контакт:</strong> {dialogData[currentMessageIndex].contact}</div>
                                    <div><strong>Метод:</strong> {dialogData[currentMessageIndex].coment}</div>
                                    <div className="flex justify-between mt-4">
                                        <Button
                                            onClick={() =>
                                                setCurrentMessageIndex((prev) => Math.max(prev - 1, 0))
                                            }
                                            disabled={currentMessageIndex === 0}
                                        >
                                            Предыдущее
                                        </Button>
                                        <Button
                                            onClick={() =>
                                                setCurrentMessageIndex((prev) =>
                                                    Math.min(prev + 1, dialogData.length - 1)
                                                )
                                            }
                                            disabled={currentMessageIndex === dialogData.length - 1}
                                        >
                                            Следующее
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                "Сообщения не найдены."
                            )}
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </section>
    )
}
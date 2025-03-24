import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import * as React from "react";
import {format} from "date-fns";
import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";
import {Plus} from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Category, Post} from "@/types/posts.type";
import {usePostEditorStore} from "@/components/admin-components/posts-admin-components/_postStore";
import {isSuccess} from "@/lib/isSuccessGuard";
import {
    createPostAction,
    deletePostAction,
    getAllPostsAction
} from "@/components/admin-components/posts-admin-components/action";



export function PostTable() {
    const [post, setPost] = React.useState<Post[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [newPostTitle, setNewPostTitle] = React.useState("");

    const {setIsCreatingPost, setCurrentPost} = usePostEditorStore();


    const getAllPostsHandle = async () => {
        try{
            const res = await getAllPostsAction();
            if (isSuccess(res)) {
                setPost(res.posts);
            } else {
                alert(res.message);
            }
        } finally {
            setLoading(false);
        }

    }

    const handleCreateNewPost = async () => {
        if (!newPostTitle) {
            alert("Пожалуйста, введите заголовок статьи.");
            return;
        }

        try {

            const res = await createPostAction(newPostTitle);
            if (isSuccess(res)) {
                setNewPostTitle("");
                await getAllPostsHandle();
            } else {
                alert(res.message);
            }
        } catch (error) {
            console.error("Ошибка:", error);
        }
    };

    const handleDeletePost = async (id: number) => {
        const confirmDelete = confirm("Вы уверены, что хотите удалить этот пост?");
        if (!confirmDelete) return;

        try {
           const res = await deletePostAction(id);
            if (isSuccess(res)) {
                setNewPostTitle("");
                await getAllPostsHandle();
            } else {
                alert(res.message);
            }
        } catch (error) {
            console.error("Ошибка при удалении:", error);
        }

    };

    const handleEditClick = (post: Post) => {
        setCurrentPost(post);
        setIsCreatingPost(true);
    };

    React.useEffect(() => {
        getAllPostsHandle();
    }, []);

    return (
        <section className='h-full'>
            <div className='absolute bottom-0 right-0 pb-5 pr-5'>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant='default' className="m-5">
                            <Plus/>
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Создать новую статью</DialogTitle>
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleCreateNewPost();
                                }}
                            >
                                <div>
                                    <label htmlFor="title">Заголовок:</label>
                                    <input
                                        id="title"
                                        type="text"
                                        value={newPostTitle}
                                        onChange={(e) => setNewPostTitle(e.target.value)}
                                        required
                                    />
                                </div>
                                <Button type="submit">Создать</Button>
                            </form>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>
            <div className='h-max overflow-hidden'>

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Название</TableHead>
                            <TableHead>Публикация</TableHead>
                            <TableHead>Редактирование</TableHead>
                            <TableHead>Категории</TableHead>
                            <TableHead>Удалить</TableHead>
                            <TableHead>Редактировать</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {!loading && post.length > 0 ? (
                            post.map((post: Post) => (
                                <TableRow key={post.id}>
                                    <TableCell className="font-medium">{post.title}</TableCell>
                                    <TableCell>{format(new Date(post.createdAt), "dd.MM.yyyy HH:mm")}</TableCell>
                                    <TableCell
                                        className="text-right">{format(new Date(post.updatedAt), "dd.MM.yyyy HH:mm")}</TableCell>
                                    <TableCell>
                                        {post.categories && post.categories.length > 0 ? (
                                            post.categories.map((category: Category) => (
                                                <Badge className='m-2' key={category.id}>
                                                    {category.name}
                                                </Badge>
                                            ))
                                        ) : (
                                            "Нет категорий"
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <Button variant="destructive" size="sm"
                                                onClick={() => handleDeletePost(post.id)}>Удалить</Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button size="sm" onClick={() => handleEditClick(post)}>Редактировать</Button>
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
            </div>
        </section>
    );
}

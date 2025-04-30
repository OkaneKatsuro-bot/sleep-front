"use client"
import {Button} from "@/components/ui/button";
import {MdEditor, config, ToolbarNames} from "md-editor-rt";
import React, {useState} from "react";
import {Dialog, DialogContent, DialogFooter, DialogTrigger} from "@/components/ui/dialog";
import {Badge} from "@/components/ui/badge";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Plus} from "lucide-react";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {usePostEditorStore} from "@/components/admin-components/posts-admin-components/_postStore";
import {Category, PostType} from "@/types/posts.type";
import {
    getCategoriesByPostAction, postNewCategoryForPostAction,
    updatePostAction, updatePostsCategoryAction,
    uploadPostImageAction
} from "@/components/admin-components/posts-admin-components/action";
import {isSuccess} from "@/lib/isSuccessGuard";
import {PostToUpdate} from "@/types/postToUpdate.type";


config({
    editorConfig: {
        languageUserDefined: {
            'rus': {
                toolbarTips: {
                    bold: 'жирный',
                    underline: 'underline',
                    italic: 'италик',
                    strikeThrough: 'strikeThrough',
                    title: 'Оглавление',
                    sub: 'подписка',
                    sup: 'superscript',
                    quote: 'quote',
                    unorderedList: 'unordered list',
                    orderedList: 'ordered list',
                    task: 'список задач',
                    codeRow: 'inline code',
                    code: 'block-level code',
                    link: 'ссылка',
                    image: 'изображение',
                    table: 'таблица',
                    mermaid: 'mermaid',
                    katex: 'formula',
                    revoke: 'revoke',
                    next: 'undo revoke',
                    save: 'сохранить',
                    prettier: 'prettier',
                    pageFullscreen: 'fullscreen in page',
                    fullscreen: 'fullscreen',
                    preview: 'preview',
                    htmlPreview: 'html preview',
                    catalog: 'catalog',
                    github: 'source code'
                },
                titleItem: {
                    h1: 'Хедер 1',
                    h2: 'Хедер 2',
                    h3: 'Хедер 3',
                    h4: 'Хедер 4',
                    h5: 'Хедер 5',
                    h6: 'Хедер 6'
                },
                imgTitleItem: {
                    link: 'Добавить ссылку на изображение',
                    upload: 'Загрузить ',
                    clip2upload: 'Clip Upload'
                },
                linkModalTips: {
                    linkTitle: 'Add Link',
                    imageTitle: 'Add Image',
                    descLabel: 'Desc:',
                    descLabelPlaceHolder: 'Enter a description...',
                    urlLabel: 'Link:',
                    urlLabelPlaceHolder: 'Enter a link...',
                    buttonOK: 'OK'
                },
                clipModalTips: {
                    title: 'Crop Image',
                    buttonUpload: 'Upload'
                },
                copyCode: {
                    text: 'Copy',
                    successTips: 'Copied!',
                    failTips: 'Copy failed!'
                },
                mermaid: {
                    flow: 'flow',
                    sequence: 'sequence',
                    gantt: 'gantt',
                    class: 'class',
                    state: 'state',
                    pie: 'pie',
                    relationship: 'relationship',
                    journey: 'journey'
                },
                katex: {
                    inline: 'inline',
                    block: 'block'
                },
                footer: {
                    markdownTotal: 'Word Count',
                    scrollAuto: 'Scroll Auto'
                }
            }
        }
    }
});

export function PostRedacor() {
    const {currentPost, setCurrentPost, setIsCreatingPost} = usePostEditorStore();
    const [text, setText] = React.useState(() => currentPost ? currentPost.body || "" : "");
    const [language] = React.useState("rus");
    const toolbarex: ToolbarNames[] = ['github', 'htmlPreview'];
    const [categoryName, setCategoryName] = React.useState<string>("");
    const [categoryLoading, setCategoryLoading] = React.useState(false);
    const [error, setError] = useState('');
    const [categories, setCategories] = useState<Category[]>([]);
    const [categories2, setCategories2] = useState<Category[]>([]);
    const [image, setImage] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    const initialPostType = currentPost
        ? (Array.isArray(currentPost.posttype) ? currentPost.posttype : [currentPost.posttype])
        : [];
    const [postType, setPostType] = React.useState<PostType[]>(initialPostType);

    const fetchCategoriesbyPost = async () => {
        if (!currentPost) return;
        const {id} = currentPost;
        try {
            const res = await getCategoriesByPostAction(id);
            if (isSuccess(res)) {
                setCategories(res.postCategories);
                setCategories2(res.allCategories);
            } else {
                alert(res.message);
            }

        } catch (error) {
            console.error("Ошибка при получении категорий:", error);
        }
    };

    React.useEffect(() => {
        fetchCategoriesbyPost();
        setImageUrl(currentPost!.image || "");
    }, [currentPost]);

    const onUploadImg = async (files: File[]) => {
        try {
            const formData = new FormData();
            files.forEach((file) => formData.append("file", file));


            const res = await uploadPostImageAction(formData);
            if (isSuccess(res)) {
                setImageUrl(res.imageUrl)
            } else {
                alert(res.message);
            }

        } catch (error) {
            console.error("Ошибка загрузки изображения:", error);
        }
    };

    const handleSave = async () => {
        if (!currentPost || !imageUrl || !postType) return;
        const {id, categories} = currentPost;

        try {
            const postToUpdate: PostToUpdate = {
                id,
                body: text,
                categories,
                image: (imageUrl as any).imageUrl ?? undefined,
                posttype: postType,
            };

            const res = await updatePostAction(postToUpdate);

            if (isSuccess(res)) {
                alert('Статья успешно сохранена!');
            } else {
                alert(res.message);
            }
        } catch (error) {
            console.error("Ошибка:", error);
        }
    };

    const handelCreateNSubmitCategory = async (e: React.FormEvent) => {
        e.preventDefault();
        setCategoryLoading(true);
        if (!currentPost) return;
        const {id} = currentPost;
        if (!categoryName) {
            alert("Пожалуйста, заполните все поля");
            setCategoryLoading(false);
            return;
        }
        try {

            const res = await postNewCategoryForPostAction(id, categoryName);
            if (isSuccess(res)) {
                setCategoryName("");
                alert("Категория успешно создана");
                await fetchCategoriesbyPost();
            } else {
                alert(res.message);
            }


        } catch (error) {
            console.error("Ошибка:", error);
            setError("Ошибка при создании категории. Пожалуйста, попробуйте еще раз.");
        } finally {
            setCategoryLoading(false);
        }
    };

    const handleRemoveCategoryFromPost = async (categoryId: number) => {
        try {
            if (!currentPost) return;
            const {id} = currentPost;
            const res = await updatePostsCategoryAction(id, categoryId, 'remove');
            if (isSuccess(res)) {
                console.log('Категория удалена из поста:');
                await fetchCategoriesbyPost();
            } else {
                alert(res.message);
            }

        } catch (error) {
            console.error("Ошибка:", error);
        }
    };

    const handleAddCategoryToPost = async (categoryId: number) => {
        try {
            if (!currentPost) return;
            const {id} = currentPost;
            const res = await updatePostsCategoryAction(id, categoryId, 'add');
            if (isSuccess(res)) {
                console.log('Категория добавлена к посту:');
                await fetchCategoriesbyPost();
            } else {
                alert(res.message);
            }

        } catch (error) {
            console.error("Ошибка:", error);
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleUploadImage = async () => {
        if (!image) {
            alert("Пожалуйста, выберите изображение.");
            return;
        }
        if (!currentPost?.id) {
            alert("Ошибка: пост не найден.");
            return;
        }
        const formData = new FormData();
        formData.append("file", image);

        try {
            const res = await uploadPostImageAction(formData);
            if (isSuccess(res)) {
                setImageUrl(res.imageUrl as string);
                console.log(imageUrl)
            } else {
                alert(res.message);
            }
        } catch (error) {
            console.error("Ошибка загрузки:", error);
            alert("Произошла ошибка при загрузке изображения.");
        }
    };

    const postTypeNames: Record<PostType, string> = {
        [PostType.MAIN]: "Главная страница",
        [PostType.TEST]: "Результат теста",
        [PostType.BASE]: "База знаний"
    };

    const handleTogglePostType = async (selectedType: PostType) => {
        let updatedTypes: PostType[];
        if (postType.includes(selectedType)) {
            updatedTypes = postType.filter((type) => type !== selectedType);
        } else {
            updatedTypes = [...postType, selectedType];
        }
        setPostType(updatedTypes);
        if (!currentPost) return;
        try {
            const {id} = currentPost;
            try {
                const postToUpdate: PostToUpdate = {
                    id,
                    posttype: updatedTypes,
                };

                const res = await updatePostAction(postToUpdate);

                if (isSuccess(res)) {
                    alert('Статья успешно сохранена!');
                } else {
                    alert(res.message);
                }
            } catch (error) {
                console.error('Ошибка при обновлении поста:', error);
            }
        } catch (error) {
            console.error('Ошибка при обновлении поста:', error);
        }
    };


    return (
        <div className="relative flex flex-col h-full">
            <div className="absolute top-0 left-0 space-x-2.5">
                <Button variant="destructive" onClick={() => {
                    setCurrentPost(null);
                    setIsCreatingPost(false);
                }}>
                    Закрыть
                </Button>
                <Button className='px-4' onClick={handleSave}>
                    Сохранить
                </Button>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>Редактировать категории</Button>
                    </DialogTrigger>
                    <DialogContent aria-describedby="dialog-description">
                        <div id="dialog-description">Пожалуйста, заполните форму для создания новой категории.</div>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button size='icon'>
                                    <Plus/>
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <form className="grid gap-4 py-4" onSubmit={handelCreateNSubmitCategory}>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="text" className="text-right">
                                            Название категории
                                        </Label>
                                        <Input
                                            id="text"
                                            value={categoryName}
                                            onChange={(e) => setCategoryName(e.target.value)}
                                            required
                                            className="col-span-3"
                                        />
                                    </div>
                                    {error && <div className="text-red-500">{error}</div>}
                                    <DialogFooter>
                                        <Button type="submit">
                                            {categoryLoading ? "Создание..." : "Создать категорию"}
                                        </Button>
                                    </DialogFooter>
                                </form>
                            </DialogContent>
                        </Dialog>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Категории поста</TableHead>
                                    <TableHead></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {categories.length > 0 ? (
                                    categories.map((category: Category) => (
                                        <TableRow key={category.id}>
                                            <TableCell>
                                                <Badge className='m-2'>{category.name}</Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Button variant="destructive"
                                                        onClick={() => handleRemoveCategoryFromPost(category.id)}>
                                                    Удалить
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={2}>Нет категорий для этого поста</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Категории</TableHead>
                                    <TableHead>Добавить</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {categories2.map((category) => (
                                    <TableRow key={category.id}>
                                        <TableCell>{category.name}</TableCell>
                                        <TableCell>
                                            <Button
                                                onClick={() => handleAddCategoryToPost(category.id)}>Добавить</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </DialogContent>
                </Dialog>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className='px-4' onClick={handleSave}>
                            Добавть обложку
                        </Button>
                    </DialogTrigger>
                    <DialogContent aria-describedby="dialog-description">
                        <Card>
                            <CardHeader>
                                <CardTitle>Image</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-7">
                                <div className="space-y-1">
                                    <Label htmlFor="new">Новый Image</Label>
                                    <Input id="new" type="file" accept="image/*" onChange={handleImageChange}/>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button onClick={handleUploadImage}>Загрузить фото</Button>
                                {imageUrl && (
                                    <img
                                        src={imageUrl}
                                        alt="Описание изображения"
                                        width={400}
                                    />
                                )}
                            </CardFooter>
                        </Card>
                    </DialogContent>
                </Dialog>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                            {postType.length > 0
                                ? postType.map((type) => postTypeNames[type]).join(", ")
                                : "Выбрать зону"}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuGroup>
                            <DropdownMenuItem onClick={() => handleTogglePostType(PostType.MAIN)}>
                                Главная страница {postType.includes(PostType.MAIN) && "✓"}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleTogglePostType(PostType.TEST)}>
                                Результат теста {postType.includes(PostType.TEST) && "✓"}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleTogglePostType(PostType.BASE)}>
                                База знаний {postType.includes(PostType.BASE) && "✓"}
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>

            </div>
            <div className="flex-grow mt-10 overflow-hidden">
                <div className="h-full w-full">
                    <MdEditor
                        toolbarsExclude={toolbarex}
                        language={language}
                        modelValue={text}
                        onChange={setText}
                        style={{height: '100%', width: '100%'}}
                        previewTheme="default"
                        onUploadImg={onUploadImg}
                    />
                </div>
            </div>
        </div>
    );
}

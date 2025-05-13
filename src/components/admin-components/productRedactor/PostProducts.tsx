"use client"
import React, {useEffect, useState} from "react";
import {useForm, SubmitHandler} from "react-hook-form";
import {Button} from "@/components/ui/button";
import {Plus} from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {
    createProductAction,
    getCategoriesAction,
    getIngredientsAction,
    getProductsAction
} from "@/components/admin-components/productRedactor/action";
import {isSuccess} from "@/lib/isSuccessGuard";

interface ProductFormData {
    name: string;
    imageFile: FileList;
    categoryId: number;
}

interface Category {
    id: number;
    name: string;
}

interface Ingredient {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
}

export function PostProducts() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [ingredientsID, setIngredientsID] = useState<number[]>([]);
    const [loading, setLoading] = useState(true);
    const {register, handleSubmit, reset, formState: {errors}} = useForm<ProductFormData>();
    const [message, setMessage] = useState("");

    // Загрузка категорий и ингредиентов
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            try {
                const categoriesRes = await getCategoriesAction();
                if (isSuccess(categoriesRes)) {
                    setCategories(categoriesRes.categories);
                }

                const ingredietsRes = await getIngredientsAction();
                if (isSuccess(ingredietsRes)) {
                    const ingredientsData = ingredietsRes.ingredients;

                    setIngredients(ingredientsData);
                } else {

                    setIngredients([]);
                }
            } catch (error) {
                console.error("Ошибка загрузки:", error);
            } finally {
                setLoading(false);
            }
        };


        fetchData();
    }, []);

    const handleCheckboxChange = (id: number, checked: boolean) => {
        setIngredientsID((prevIds) =>
            checked ? [...prevIds, id] : prevIds.filter((ingredientId) => ingredientId !== id),
        );
    };

    const onSubmit: SubmitHandler<{
        name: string;
        imageFile: FileList;
        categoryId: number;
    }> = async (data) => {
        const formData = new FormData();

        formData.append("name", data.name);
        formData.append("categoryId", data.categoryId.toString());

        if (data.imageFile && data.imageFile[0]) {
            formData.append("image", data.imageFile[0]);
        }

        formData.append("accessories", JSON.stringify(ingredientsID));


        const res = await createProductAction(formData);
        if (isSuccess(res)) {
            setMessage("Товар успешно добавлен!");
            reset();
            setIngredientsID([]);
        } else {
            setMessage("Ошибка при добавлении товара.");
        }
    };


    return (
        <div>
            <div className='absolute bottom-40 right-0 pb-5 pr-5'>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant='default' className="m-5">
                            <Plus/>
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Создать новый товар</DialogTitle>
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                <div>
                                    <label>Название товара:</label>
                                    <input {...register("name", {required: true})}
                                           className="mt-1 block w-full p-2 border rounded-md"/>
                                    {errors.name && <span className="text-red-500">Обязательное поле</span>}
                                </div>

                                <div>
                                    <label>Изображение товара:</label>
                                    <input type="file" accept="image/*" {...register("imageFile", {required: true})}
                                           className="mt-1 block w-full"/>
                                    {errors.imageFile && <span className="text-red-500">Обязательное поле</span>}
                                </div>


                                <div>
                                    <label>Категория:</label>
                                    <select
                                        {...register("categoryId", {required: true})}
                                        className="mt-1 block w-full p-2 border rounded-md"
                                    >
                                        <option value="">Выберите категорию</option>
                                        {categories.map((category) => (
                                            <option key={category.id} value={category.id}>{category.name}</option>
                                        ))}
                                    </select>
                                    {errors.categoryId && <span className="text-red-500">Обязательное поле</span>}
                                </div>


                                <div>
                                    <label>Выберите аксессуары:</label>
                                    <div className="mt-2 grid grid-cols-2 gap-3">
                                        {ingredients.map((ingredient) => (
                                            <label key={ingredient.id} className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    className="mr-2"
                                                    checked={ingredientsID.includes(ingredient.id)}
                                                    onChange={(e) => handleCheckboxChange(ingredient.id, e.target.checked)}
                                                />
                                                <img src={ingredient.imageUrl} alt={ingredient.name}
                                                     className="w-12 h-12 rounded mr-2"/>
                                                <span>{ingredient.name} ({ingredient.price}₽)</span>
                                            </label>
                                        ))}
                                    </div>

                                </div>

                                <Button type="submit">Создать товар</Button>
                                {message && <p className="mt-2 text-sm text-green-600">{message}</p>}
                            </form>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}
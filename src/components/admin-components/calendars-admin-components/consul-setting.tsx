import {Button} from "@/components/ui/button";
import * as React from "react";

import {useEffect, useState} from "react";
import {Plus} from "lucide-react";
import {Dialog, DialogContent, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "./form";
import {Input} from "@/components/ui/input";
import {DropdownMenu, DropdownMenuContent, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import DocconsulComp from "./consul-component"
import {ConsulProduct} from "@/types/calendar.types/ConsulProduct";
import {SafeUser} from "@/types/safeuser.type";
import {fetchAllDoctorProduct, fetchAllDoctors} from "./handlers";
import {postConsulProductAction} from "@/components/admin-components/calendars-admin-components/action";
import {isSuccess} from "@/lib/isSuccessGuard";


const validationMessages = {
    title: "Название должно содержать не менее 2 символов.",
    description: "Описание должно содержать не менее 2 символов.",
    doctor: "Необходимо выбрать врача.",
};

const formSchema = z.object({
    title: z.string().min(2, {message: validationMessages.title}),
    description: z.string().min(2, {message: validationMessages.description}),
    price: z.coerce.number().min(0, {
        message: "Цена должна быть положительным числом",
    }),
    doctorId: z.string().min(1, {message: validationMessages.doctor}),
    image: z.instanceof(File).optional(),
});

export default function ConsulSetting() {
    const [doctorsProducts, setDoctorsProducts] = useState<ConsulProduct[]>([]);
    const [doctors, setDoctors] = useState<SafeUser[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [chosendoctor, setChosendoctor] = useState<SafeUser | null>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
            price: 0,
            doctorId: "",
            image: undefined,
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("description", values.description);
        formData.append("price", values.price.toString());
        formData.append("doctorId", values.doctorId);
        if (values.image) {
            formData.append("image", values.image);
        }
        console.log("🚀 SUBMITTING FORM", [...formData.entries()]);
        try {
            const res = await postConsulProductAction(formData);
            if (isSuccess(res)) {
                alert("Услуга врача успешно добавлена!");
                console.log("Услуга врача успешно добавлена!", res.data);
                form.reset();
                await fetchData();
            } else {
                alert(res.message);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Произошла ошибка. Пожалуйста, попробуйте позже.");
        }
    }


    const fetchData = async () => {
        try {
            const [doctorProductList, doctorsList] = await Promise.all([fetchAllDoctorProduct(), fetchAllDoctors()]);

            setDoctors(doctorsList!);
            setDoctorsProducts(doctorProductList!);
        } catch (err) {
            console.error("Ошибка при загрузке данных:", err);
            setError("Не удалось загрузить данные.");
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDoctorSelect = (doctor: SafeUser) => {
        setChosendoctor(doctor);
        form.setValue("doctorId", doctor.id);
    };

    return (
        <div className="flex flex-col w-full h-full">
            <Dialog>
                <DialogTrigger asChild>
                    <Button className="absolute bottom-0 right-0 m-5">
                        <Plus/>
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogTitle>Добавить услугу консультации врача</DialogTitle>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Консультация врача" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Описание консультации" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="price"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Цена</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="1000" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="image"
                                render={() => (
                                    <FormItem>
                                        <FormLabel>Image</FormLabel>
                                        <FormControl>
                                            <Input type="file"
                                                   onChange={(e) => form.setValue("image", e.target.files?.[0])}/>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <div className="flex flex-col gap-3">
                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                        <Button>
                                            {chosendoctor?.name ? `${chosendoctor.name} ${chosendoctor.surname}` : "Выберите врача"}
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        {error ? (
                                            <div className="text-red-500">{error}</div>
                                        ) : (
                                            <div>
                                                {doctors.map((doctor) => (
                                                    <div
                                                        key={doctor.id}
                                                        onClick={() => handleDoctorSelect(doctor)}
                                                        className="p-2 border-b hover:bg-gray-100 cursor-pointer"
                                                    >
                                                        {doctor.name} {doctor.surname}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                <Button type="submit">Создать</Button>
                            </div>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>


            {doctorsProducts.length > 0 ? (
                <div className="grid grid-cols-3 gap-4">
                    {doctorsProducts.map((docprod) => (
                        <DocconsulComp key={docprod.id} consul={docprod}/>
                    ))}
                </div>
            ) : (
                <div>{error || "Загрузка..."}</div>
            )}
        </div>
    );
}

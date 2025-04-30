import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import {Method} from "@/types/method.type";
import {SafeUser} from "@/types/safeuser.type";
import {Product} from "@/types/product.type";
import DoctorForm from "@/components/client-profile-component/doctorform";

// 🛠 Универсальный карусельный компонент с `variant`
interface CarouselComponentProps<T> {
    items: T[];
    titleKey: keyof T;
    descKey?: keyof T;
    imageKey: keyof T;
    variant: "doctor" | "metod" | "product"; // Определяем тип контента
}

function CarouselComponent<T extends Record<string, unknown>>({
                                                                  items,
                                                                  titleKey,
                                                                  descKey,
                                                                  imageKey,
                                                                  variant,
                                                              }: CarouselComponentProps<T>) {
    const [carouselRef, api] = useEmblaCarousel({loop: true, align: "center"});
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const router = useRouter();

    React.useEffect(() => {
        if (!api) return;

        const onSelect = () => setSelectedIndex(api.selectedScrollSnap());
        api.on("select", onSelect);
        onSelect();

        return () => {
            api?.off("select", onSelect);
        };
    }, [api]);

    const scrollTo = (index: number) => api?.scrollTo(index);
    const slideCount = items.length;

    return (
        <div className="h-1/3 bg-white rounded-3xl shadow-md flex flex-col relative overflow-hidden">
            <div ref={carouselRef} className="overflow-hidden w-full flex-1">
                <div className="flex">
                    {items.map((item, index) => {
                        const title = String(item[titleKey]);
                        const desc = descKey ? String(item[descKey]) : "";
                        const image = String(item[imageKey]) || "/budkofaja.jpeg";
                        const id = String((item as Record<string, unknown>)["id"]);

                        return (
                            <div
                                key={index}
                                className="flex-shrink-0 w-full p-4 flex flex-row items-center justify-center text-center"
                            >
                                <div className="flex justify-center w-full">
                                    <img
                                        className="rounded-lg object-cover mb-4 w-24 h-24"
                                        src={image}
                                        alt={`Изображение ${title}`}
                                        width={100}
                                        height={100}
                                    />
                                </div>

                                <div className="flex flex-col flex-grow justify-between">
                                    <div>
                                        <div className="font-bold text-lg">{title}</div>
                                        {descKey && <div className="text-gray-600">{desc}</div>}
                                    </div>

                                    <div className="mt-3">
                                        {variant === "doctor" && (
                                            <Button
                                                onClick={() => router.push(`/consultations/${id}`)}
                                                className="text-xl font-semibold"
                                            >
                                                Записаться на прием к врачу
                                            </Button>
                                        )}
                                        {variant === "metod" && (
                                            <DoctorForm metod={title}/>
                                        )}
                                        {variant === "product" && (
                                            <Button
                                                className="text-xl font-semibold"
                                                onClick={() => router.push(`/shop/product/${id}`)}
                                            >
                                                Перейти в магазин
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
                {slideCount > 1 &&
                    Array.from({length: slideCount}, (_, index) => (
                        <button
                            key={index}
                            onClick={() => scrollTo(index)}
                            className={`w-3 h-3 rounded-full transition ${
                                index === selectedIndex ? "bg-blue-500 scale-110" : "bg-gray-400"
                            }`}
                        />
                    ))}
            </div>
        </div>
    );
}

// 🏥 Компонент с докторами (с кнопкой "Записаться на консультацию")
export function DoctorsComponent({doctors}: { doctors: SafeUser[] }) {
    return (
        <CarouselComponent<SafeUser>
            items={doctors}
            titleKey="name"
            descKey="specialty"
            imageKey="image"
            variant="doctor"
        />
    );
}


// 🏥 Компонент с методами лечения (оставляем форму)
export function MetodsComponent({metods}: { metods: Method[] }) {
    return (
        <CarouselComponent<Method>
            items={metods}
            titleKey="title"
            descKey="description"
            imageKey="image"
            variant="metod"
        />
    );
}

// 🏥 Компонент с товарами (кнопка "Перейти в магазин")
export function ProductsComponent({products}: { products: Product[] }) {
    return (
        <CarouselComponent<Product>
            items={products}
            titleKey="name"
            descKey="createdAt"
            imageKey="imageUrl"
            variant="product"
        />
    );
}


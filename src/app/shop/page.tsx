'use client'

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Container } from "@/components/ui/container";
import { Title } from "@/components/ui/shared/title";
import Footer from "@/components/base-ui/footer";
import { findProduct, GetSearchParams } from "@/lib/shop/findProduct";
import { SearchInput2 } from "@/components/shop/search-input2";
import { CartButton } from "@/components/shop/cart-button";
import { TopBar } from "@/components/shop/top-bar";
import { Filters } from "@/components/shop/filters";
import { ProductsGroupList } from "@/components/shop/product-group-list";
import { CategoryType } from "@/types/shop.types/shop.type";

// Компонент для обработки поиска
const SearchParamsComponent = ({ categories }: { categories: CategoryType[] }) => {
    return (
        <div className="flex-1 pl-4 lg:pl-8">
            <div className="flex flex-col gap-8 sm:gap-16">
                {categories.map((category: CategoryType) =>
                    category.products.length > 0 ? (
                        <ProductsGroupList
                            key={category.id}
                            title={category.name}
                            categoryId={category.id}
                            items={category.products}
                        />
                    ) : null
                )}
            </div>
        </div>
    );
};

export default function Home() {
    const [categories, setCategories] = useState<CategoryType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const searchParams = useSearchParams();

    useEffect(() => {
        const fetchCategories = async () => {
            const params: GetSearchParams = {
                query: searchParams.get('query') || '',
            };
            const fetchedCategories = await findProduct(params);
            setCategories(fetchedCategories);
            setLoading(false);
        };

        fetchCategories();
    }, [searchParams]);

    if (loading) {
        return <div>Загрузка...</div>;
    }

    const hasSearch = true;
    const hasCart = true;

    return (
         <Suspense fallback={<div>Загрузка страницы …</div>}>
            {/* Верхняя панель с заголовком, поиском и кнопкой корзины */}
            <Container className="mt-10">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    {/* Левая часть: Заголовок */}
                    <Title text="Каталог" size="lg" className="font-extrabold" />

                    {/* Средняя часть: Поиск */}
                    {hasSearch && (
                        <div className="w-full sm:flex-1 sm:ml-10">
                            <SearchInput2 />
                        </div>
                    )}

                    {/* Правая часть: Кнопка корзины */}
                    {hasCart && (
                        <div className="flex items-center gap-3">
                            <CartButton />
                        </div>
                    )}
                </div>
            </Container>

            {/* Навигационная панель */}
            <TopBar categories={categories.filter((category) => category.products.length > 0)} />

            {/* Основной контент */}
            <Container className="mt-10 pb-14">
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-[80px]">
                    {/* Фильтры (скрыты на мобильных) */}
                    <div className="lg:w-[250px] hidden lg:block">
                        <Suspense fallback={<div>Загрузка фильтров...</div>}>
                            <Filters />
                        </Suspense>
                    </div>

                    {/* Список товаров */}
                    <Suspense fallback={<div>Загрузка товаров...</div>}>
                        <SearchParamsComponent categories={categories} />
                    </Suspense>
                </div>
            </Container>
            <Footer />
       </Suspense>
    );
}

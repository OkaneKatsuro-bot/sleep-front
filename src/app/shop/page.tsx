import {Suspense} from 'react';
import {Container} from "@/components/ui/container";
import {Title} from "@/components/ui/shared/title";
import Footer from "@/components/base-ui/footer";
import {findProduct, GetSearchParams} from "@/lib/shop/findProduct";
import {SearchInput2} from "@/components/shop/search-input2";
import {CartButton} from "@/components/shop/cart-button";
import {TopBar} from "@/components/shop/top-bar";
import {Filters} from "@/components/shop/filters";
import {ProductsGroupList} from "@/components/shop/product-group-list";
import {CategoryType} from "@/types/shop.types/shop.type";


export default async function Home({searchParams}: { searchParams: GetSearchParams }) {
    const categories = await findProduct(searchParams);

    const hasSearch = true;
    const hasCart = true;

    return (
        <>
            {/* Верхняя панель с заголовком, поиском и кнопкой корзины */}
            <Container className="mt-10">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    {/* Левая часть: Заголовок */}
                    <Title text="Каталог" size="lg" className="font-extrabold"/>

                    {/* Средняя часть: Поиск */}
                    {hasSearch && (
                        <div className="w-full sm:flex-1 sm:ml-10">
                            <SearchInput2/>
                        </div>
                    )}

                    {/* Правая часть: Кнопка корзины */}
                    {hasCart && (
                        <div className="flex items-center gap-3">
                            <CartButton/>
                        </div>
                    )}
                </div>
            </Container>

            {/* Навигационная панель */}
            <TopBar categories={categories.filter((category) => category.products.length > 0)}/>

            {/* Основной контент */}
            <Container className="mt-10 pb-14">
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-[80px]">
                    {/* Фильтры (скрыты на мобильных) */}
                    <div className="lg:w-[250px] hidden lg:block">
                        <Suspense>
                            <Filters/>
                        </Suspense>
                    </div>

                    {/* Список товаров */}
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
                </div>
            </Container>
            <Footer/>
        </>
    );
}

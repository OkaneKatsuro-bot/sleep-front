// src/app/shop/page.tsx
import { Suspense } from 'react'
import { Container } from "@/components/ui/container"
import { Title } from "@/components/ui/shared/title"
import Footer from "@/components/base-ui/footer"
import { findProduct } from "@/lib/shop/findProduct"
import { SearchInput2 } from "@/components/shop/search-input2"
import { CartButton } from "@/components/shop/cart-button"
import { TopBar } from "@/components/shop/top-bar"
import { Filters } from "@/components/shop/filters"
import { ProductsGroupList } from "@/components/shop/product-group-list"
import { CategoryType } from "@/types/shop.types/shop.type"

type SearchParams = { query?: string }

export default async function ShopPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  // 1) Получили данные на сервере:
  const categories: CategoryType[] = await findProduct(searchParams)

  const hasSearch = true
  const hasCart = true

  return (
    <>
      {/* Шапка с заголовком, поиском и корзиной */}
      <Container className="mt-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <Title text="Каталог" size="lg" className="font-extrabold" />

          {hasSearch && (
            <div className="w-full sm:flex-1 sm:ml-10">
              <SearchInput2 />
            </div>
          )}

          {hasCart && (
            <div className="flex items-center gap-3">
              <CartButton />
            </div>
          )}
        </div>
      </Container>

      {/* Топ-бар с уже готовыми категориями */}
      <TopBar categories={categories.filter((c) => c.products.length > 0)} />

      {/* Основной контент */}
      <Container className="mt-10 pb-14">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-[80px]">
          {/* Фильтры */}
          <div className="lg:w-[250px] hidden lg:block">
            <Suspense fallback={<div>Загрузка фильтров…</div>}>
              <Filters />
            </Suspense>
          </div>

          {/* Список товаров (серверный рендеринг) */}
          <div className="flex-1 pl-4 lg:pl-8">
            <div className="flex flex-col gap-8 sm:gap-16">
              {categories.map((category) =>
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

      <Footer />
    </>
  )
}

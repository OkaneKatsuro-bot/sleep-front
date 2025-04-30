import {shop} from '@/api'
import {CategoryType} from "@/types/shop.types/shop.type";

export interface GetSearchParams {
    query?: string;
    sortBy?: string;
    sizes?: string;
    pizzaTypes?: string;
    ingredients?: string;
    priceFrom?: string;
    priceTo?: string;
}

const DEFAULT_MIN_PRICE = 0;
const DEFAULT_MAX_PRICE = 1000;

export const findProduct = async (params: GetSearchParams) => {
    const sizes = params.sizes ? params.sizes?.split(',').map(String) : [];
    //const pizzaTypes = params.pizzaTypes?.split(',').map(Number);
    const ingredientsIdArr = params.ingredients
        ? params.ingredients.split(',').map(Number)
        : [];

    const minPrice = Number(params.priceFrom) || DEFAULT_MIN_PRICE;
    const maxPrice = Number(params.priceTo) || DEFAULT_MAX_PRICE;

    const categories = await shop.catalog(minPrice, maxPrice, ingredientsIdArr, sizes);


    console.log('список категорий', categories)
    return categories as CategoryType[]
};

// const categories = await prisma.category2.findMany({
//     include: {
//         products: {
//             orderBy: {
//                 id: 'desc',
//             },
//             where: {
//                 ingredients: ingredientsIdArr
//                     ? {
//                         some: {
//                             id: {
//                                 in: ingredientsIdArr,
//                             },
//                         },
//                     }
//                     : undefined,
//                 items: {
//                     some: {
//                         complect: {
//                             in: sizes,
//                         },
//                         price: {
//                             gte: minPrice, // >=
//                             lte: maxPrice, // <=
//                         },
//                     },
//                 },
//             },
//             include: {
//                 ingredients: true,
//                 items: {
//                     where: {
//                         price: {
//                             gte: minPrice,
//                             lte: maxPrice,
//                         },
//                     },
//                     orderBy: {
//                         price: 'asc',
//                     },
//                 },
//             },
//         },
//     },
// });
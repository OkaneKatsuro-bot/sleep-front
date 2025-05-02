import { CartItemDTO } from "@/types/cart.dto";

export const calcCartItemTotalPrice = (item: CartItemDTO): number => {
  // Указываем правильный тип для аккумулятора (number) и для ингредиента
  const ingredientsPrice = item.ingredients.reduce((acc: number, ingredient: { price: number }) => acc + ingredient.price, 0);

  return (ingredientsPrice + item.productItem.price) * item.quantity;
};

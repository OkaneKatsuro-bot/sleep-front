import React from 'react';
import { WhiteBlock } from '../white-block';
import {CartStateItem} from "@/lib/shop/get-cart-details";
import {getCartItemDetails} from "@/lib/shop/get-cart-item-details";
import {CheckoutItemSkeleton} from "@/components/shop/checkout-item-skeleton";
import {CheckoutItem} from "@/components/shop/checkout/checkout-item";


interface Props {
  items: CartStateItem[];
  onClickCountButton: (id: number, quantity: number, type: 'plus' | 'minus') => void;
  removeCartItem: (id: number) => void;
  loading?: boolean;
  className?: string;
}

export const CheckoutCart: React.FC<Props> = ({
  items,
  onClickCountButton,
  removeCartItem,
  loading,
  className,
}) => {
  return (
    <WhiteBlock title="1. Корзина" className={className}>
      <div className="flex flex-col gap-4 sm:gap-5"> {/* Adjust gap for smaller screens */}
        {loading
          ? [...Array(4)].map((_, index) => <CheckoutItemSkeleton key={index} />)
          : items.map((item) => (
              <CheckoutItem
                key={item.id}
                id={item.id}
                imageUrl={item.imageUrl}
                details={getCartItemDetails(
                  item.ingredients,
                )}
                name={item.name}
                price={item.price}
                quantity={item.quantity}
                disabled={item.disabled}
                onClickCountButton={(type) => onClickCountButton(item.id, item.quantity, type)}
                onClickRemove={() => removeCartItem(item.id)}
                className="flex flex-col sm:flex-row items-start justify-between" // Ensure items stack on mobile
              />
            ))}
      </div>
    </WhiteBlock>
  );
};

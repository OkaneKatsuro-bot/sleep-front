import {CartStateItem, getCartDetails} from '@/lib/shop/get-cart-details';
import {CreateCartItemValues} from '@/types/cart.dto';
import {create} from 'zustand';
import {shop} from '@/api'



export interface CartState {
    loading: boolean;
    error: boolean;
    totalAmount: number;
    items: CartStateItem[];

    /* Получение товаров из корзины */
    fetchCartItems: () => Promise<void>;

    /* Запрос на обновление количества товара */
    updateItemQuantity: (id: number, quantity: number) => Promise<void>;

    /* Запрос на добавление товара в корзину */
    addCartItem: (values: CreateCartItemValues) => Promise<void>;

    /* Запрос на удаление товара из корзины */
    removeCartItem: (id: number) => Promise<void>;
}

export const useCartStore = create<CartState>((set) => {
    return ({
        items: [],
        error: false,
        loading: false,
        totalAmount: 0,

        fetchCartItems: async () => {
            try {
                set({loading: true, error: false});
                const data = await shop.getCart();
                set(getCartDetails(data));
            } catch (error) {
                console.error(error);
                set({error: true});
            } finally {
                set({loading: false});
            }
        },

        updateItemQuantity: async (id: number, quantity: number) => {
            try {
                set({loading: true, error: false});
                const data = await shop.updateCart(id, quantity);
                set(getCartDetails(data));
            } catch (error) {
                console.error(error);
                set({error: true});
            } finally {
                set({loading: false});
            }
        },

        removeCartItem: async (id: number) => {
            try {
                set((state) => ({
                    loading: true,
                    error: false,
                    items: state.items.map((item) => (item.id === id ? {...item, disabled: true} : item)),
                }));
                const data = await shop.removeCartItem(id);
                set(getCartDetails(data));
            } catch (error) {
                console.error(error);
                set({error: true});
            } finally {
                set((state) => ({
                    loading: false,
                    items: state.items.map((item) => ({...item, disabled: false})),
                }));
            }
        },

        addCartItem: async (values: CreateCartItemValues) => {
            try {
                set({loading: true, error: false});
                const data = await shop.postCart(values);
                set(getCartDetails(data));
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (error) {
                set({error: true});
            } finally {
                set({loading: false});
            }
        },
    });
});

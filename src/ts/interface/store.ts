/** shoppingcart store */

export interface ShoppingCartStore {
  count: number;
  id: string;
  price?: number;
  pricePerOne: number;
  thumbnail: string;
  title: string;
}
export type ShoppingCartStoreValue = ShoppingCartStore[];

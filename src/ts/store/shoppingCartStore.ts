import { ShoppingCartStore } from '../interface/store';

/** 장바구니 localStorage */
export const shoppingCartStore = {
  setLocalStorage(product: ShoppingCartStore) {
    localStorage.setItem('shoppingCart', JSON.stringify(product));
  },
  getLocalStorage() {
    return JSON.parse(localStorage.getItem('shoppingCart')) || [];
  },
  removeLocalStorage() {
    return localStorage.removeItem('shoppingCart');
  },
  clearLocalStorage() {
    localStorage.clear();
  },
};

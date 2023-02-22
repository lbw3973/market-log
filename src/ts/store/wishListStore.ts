/** 찜하기 목록 localStorage */
export const wishListStore = {
  setLocalStorage(product) {
    localStorage.setItem('wishList', JSON.stringify(product));
  },
  getLocalStorage() {
    return JSON.parse(localStorage.getItem('wishList')) || [];
  },
  removeLocalStorage() {
    return localStorage.removeItem('wishList');
  },
  clearLocalStorage() {
    localStorage.clear();
  },
};

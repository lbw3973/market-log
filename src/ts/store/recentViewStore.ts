export const recentViewStore = {
  setLocalStorage(product) {
    localStorage.setItem('recentView', JSON.stringify(product));
  },
  getLocalStorage() {
    return JSON.parse(localStorage.getItem('recentView')) || [];
  },
  removeLocalStorage() {
    return localStorage.removeItem('recentView');
  },
  clearLocalStorage() {
    localStorage.clear();
  },
};

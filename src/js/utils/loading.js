export const toggleLoadingSpinner = (isActive) => {
  const LoadingSpinner = document.querySelector('.loadingGif');
  LoadingSpinner.style.display = isActive ? 'block' : 'none';
};

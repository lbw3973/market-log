export const toggleLoadingSpinner = (isActive) => {
  const LoadingSpinner = document.querySelector('.loadingGif');
  console.log(LoadingSpinner);
  isActive
    ? (LoadingSpinner.style.display = 'block')
    : (LoadingSpinner.style.display = 'none');
};

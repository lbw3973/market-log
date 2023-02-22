export const toggleLoadingSpinner = (isActive) => {
  isActive
    ? ((document.querySelector('.loadingGif').style.display = 'block'),
      (document.querySelector('body').style.overflow = 'hidden'))
    : ((document.querySelector('.loadingGif').style.display = 'none'),
      (document.querySelector('body').style.overflow = 'visible'));
};

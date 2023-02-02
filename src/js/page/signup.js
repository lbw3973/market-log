const btnEl = document.querySelector('.btn');
const idEl = document.querySelector('input[type=text]').value;
const pwdEl = document.querySelector('input[type=password]').value;
const emailEl = document.querySelector('input[type=email]').value;
// emailEl.addEventListener('input', function() {
//   console.log(idEl)
// })

btnEl.addEventListener('click', function () {
  const idEl = document.querySelector('input[type=text]').value;
  const pwdEl = document.querySelectorAll('input[type=password]')[0].value;
  const pwdsEl = document.querySelectorAll('input[type=password]')[1].value;
  const emailEl = document.querySelector('input[type=email]').value;

  if (idEl === '' || idEl === '' || emailEl === '') {
    console.log('공백 ㄴㄴ');
  }
  if (pwdEl !== pwdsEl) {
    console.log('비번다름');
  }
});

import calendar from './calendar';
import modal from './modal';
calendar();
modal();

async function getOrderHistory() {
  const res = await fetch(url, {
    method: 'GET',
    headers: '',
  });
  const json = await res.json();
  console.log('get', json);

  return json;
}

window.addEventListener('load', () => {});

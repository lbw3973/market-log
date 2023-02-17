import { renderDashboardCurrent, renderDashboardChart } from './renderDetail';
import { getAllOrder, getAllProduct } from './api';
import { formatPrice } from './format';
import Chart from 'chart.js/auto';

export const dashboardHandler = async () => {
  let orders = await getAllOrder();
  let products = await getAllProduct();

  const currentStatus = setCurrentStatus(orders, products);
  renderDashboardCurrent(currentStatus);
  renderDashboardChart();
  setDashBoardChartCategory(products);
  setDashBoardChartAmount(orders);
};

const setDashBoardChartCategory = (products) => {
  const chartCategory = document.querySelector('#chartCategory');

  const keyboardNum = products.filter(
    (product) => product.tags[0] === '키보드',
  ).length;

  const keycapNum = products.filter(
    (product) => product.tags[0] === '키캡',
  ).length;

  const switchNum = products.filter(
    (product) => product.tags[0] === '스위치',
  ).length;

  const accessory = products.filter(
    (product) => product.tags[0] === '액세서리',
  ).length;

  new Chart(chartCategory, {
    type: 'pie',
    data: {
      labels: ['키보드', '키캡', '스위치', '액세서리'],
      datasets: [
        {
          label: ' 거래 수 ',
          data: [keyboardNum, keycapNum, switchNum, accessory],
        },
      ],
    },
    options: {
      responsive: false,
      plugins: {
        legend: {
          position: 'left',
          labels: {
            padding: 20,
            usePointStyle: true,
          },
        },
      },
    },
  });
};

const setDashBoardChartAmount = (orders) => {
  const chartAmount = document.querySelector('#chartAmount');

  const thisWeek = [];

  for (i = 0; i < 7; i++) {
    thisWeek.unshift(Number(getDate().today) - i);
  }

  const amountOfthisWeek = [];

  for (i = 0; i < 7; i++) {
    const todayOrder = orders.filter(
      (order) =>
        Number(order.timePaid.substr(8, 2)) === thisWeek[i] &&
        order.isCanceled === false,
    );
    amountOfthisWeek.unshift(
      todayOrder.reduce((acc, cur) => acc + cur.product.price, 0),
    );
  }

  new Chart(chartAmount, {
    type: 'line',
    data: {
      labels: thisWeek.map((date) => `${date}일`),
      datasets: [
        {
          label: '거래 금액',
          data: amountOfthisWeek,
        },
      ],
    },
    options: {
      responsive: false,
      plugins: {
        legend: {
          display: false,
        },
      },
    },
  });
};

const getDate = () => {
  const today = new Date();

  const dateObj = {
    date: today,
    month: String(today.getMonth() + 1).padStart(2, 0),
    today: String(today.getDate()).padStart(2, 0),
  };
  return dateObj;
};

const setCurrentStatus = (orders, products) => {
  const currentStatus = {
    orderStatus: {
      num: 0,
      cancelNum: 0,
      doneNum: 0,
      amount: 0,
    },
    productStatus: {
      num: products.length,
      soldOutNum: 0,
    },
  };

  currentStatus.orderStatus.num = orders.filter(
    (order) => order.timePaid.substr(5, 2) === getDate().month,
  ).length;

  currentStatus.orderStatus.cancelNum = orders.filter(
    (order) =>
      order.timePaid.substr(5, 2) === getDate().month &&
      order.isCanceled === true,
  ).length;

  currentStatus.orderStatus.doneNum = orders.filter(
    (order) =>
      order.timePaid.substr(5, 2) === getDate().month && order.done === true,
  ).length;

  currentStatus.orderStatus.amount = formatPrice(
    orders
      .filter(
        (order) =>
          order.timePaid.substr(5, 2) === getDate().month &&
          order.isCanceled === false,
      )
      .reduce((acc, cur) => acc + Number(cur.product.price), 0),
  );

  currentStatus.productStatus.soldOutNum = products.filter(
    (product) => product.isSoldOut === true,
  ).length;

  return currentStatus;
};

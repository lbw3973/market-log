import {
  renderDashboardCurrent,
  renderDashboardChart,
} from './renderDetail.js';
import { toggleLoadingSpinner } from '../../utils/loading.js';
import { getAllOrder, getAllProducts } from '../../api.js';
import { formatPrice } from '../../utils/format.js';
import Chart from 'chart.js/auto';
import { $ } from '../../utils/dom';

/** 대시보드 페이지 핸들러 */
export const dashboardHandler = async () => {
  toggleLoadingSpinner(true);

  let orders = await getAllOrder();
  let products = await getAllProducts();

  const currentStatus = setCurrentStatus(orders, products);
  renderDashboardCurrent(currentStatus);
  renderDashboardChart();
  setDashBoardChartCategory(products);
  setDashBoardChartAmount(orders);
  toggleLoadingSpinner(false);
};

/** 거래 카테고리 통계 chart 생성 */
const setDashBoardChartCategory = (products) => {
  const chartCategory = $('#chartCategory');

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

/** 금주 거래 금액 통계 chart 생성 */
const setDashBoardChartAmount = (orders) => {
  const chartAmount = $('#chartAmount');

  const thisWeek = [];

  for (let i = 0; i < 7; i++) {
    thisWeek.unshift(Number(getDate().today) - i);
  }

  const amountOfthisWeek = [];

  for (let i = 0; i < 7; i++) {
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

/** 현재 날짜 가져오기 */
const getDate = () => {
  const today = new Date();

  const dateObj = {
    date: today,
    month: String(today.getMonth() + 1).padStart(2, 0),
    today: String(today.getDate()).padStart(2, 0),
  };
  return dateObj;
};

/** 거래, 상품 현황 상태 설정 */
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

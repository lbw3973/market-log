// dotenv 사용 예시
import dotenv from 'dotenv';
import Navigo from 'navigo';
import { base_url, api_key, user_name, admin_email } from '../db.js';
dotenv.config();
window.localStorage.clear(); // TODO : 삭제

const router = new Navigo('/');

const headers = {
  'content-type': 'application/json',
  apikey: api_key,
  username: user_name,
};

const btnGetList = document.querySelector('.getlist');
const temporaryEl = document.querySelector('.temporary');
const myPageAccountContainer = document.querySelector(
  '.mypage__account__container',
);
const loadingImgEl = document.querySelector('#lodingGIF');
btnGetList.textContent = '은행 목록 가져오기'; // 삭제 예정

router.on({
  '/mypage/order': () => {
    myPageAccountContainer.innerHTML = '';
  },
  '/mypage/account': async () => {
    loadingImgEl.style.display = 'block';
    renderPage(htmlMypage_Account);
    await initFunc();
    loadingImgEl.style.display = 'none';
  },
  '/mypage/heart': () => {
    myPageAccountContainer.innerHTML = '';
  },
  '/mypage/modify': () => {
    myPageAccountContainer.innerHTML = '';
  },
});

const htmlMypage_Account = `
<div class="mypage__account__wrapper">
  <div class="mypage__account__header">
    <h1>계좌 관리</h1>
  </div>
  <div class="user__account">
    <p class="total__balance"></p>
    <ul></ul>
    <div></div>
  </div>
</div>
<div class="create__account">
  <div class="create__account__modal">
    <div class="modal__container">
      <h2>계좌 추가</h2>
      <ul></ul>
      <div class="accountNumber">
        <span>계좌 번호</span>
        <input type="text" id="input__account" class="create__input" />
      </div>
      <div class="phoneNumber">
        <span>전화 번호</span>
        <input type="text" id="input__phone" class="create__input" />
      </div>
      <div class="modal__notice">
        <p>· 계좌번호와 전화번호에는 - 구분이 없어야 합니다.</p>
        <p>
          · 은행 [] 안의 숫자를 모두 더하면 각 은행의 유효한 계좌번호
          길이가 됩니다.
        </p>
      </div>
      <div class="modal__button__create">
        <button id="btnFinalCreate">추가</button>
      </div>
      <button id="btnCloseModal">X</button>
    </div>
  </div>
</div>
<div class="delete__account">
  <div class="delete__account__modal">
    <div class="modal__container">
      <h2>계좌 삭제</h2>
      <span>정말로 삭제 하시겠습니까?</span>
      <div>
        <button id="delete-ok">예</button>
        <button id="delete-cancel">아니오</button>
      </div>
    </div>
  </div>
</div>
`;

function renderPage(html) {
  myPageAccountContainer.innerHTML = html;
}

async function initFunc() {
  const divUserAccount = document.querySelector('.user__account');
  const dicCreateAccount = document.querySelector('.create__account');
  const btnCloseModal = document.querySelector('#btnCloseModal');
  const inputAccountNumberEl =
    dicCreateAccount.querySelector('#input__account');
  const inputPhoneNumberEl = dicCreateAccount.querySelector('#input__phone');
  const btnFinalCreate = document.querySelector('#btnFinalCreate');
  const divDeleteAccount = document.querySelector('.delete__account');

  const btnCreateAccount = document.createElement('button');
  const UserAccounts = await getUserAccounts();
  showUserAccounts(divUserAccount, UserAccounts);
  btnCreateAccount.classList.add('btn__create__account');
  btnCreateAccount.innerText = '계좌추가!';
  divUserAccount.querySelector('div').append(btnCreateAccount);

  // Input Tag Custom : 숫자만 입력 가능
  inputAccountNumberEl.addEventListener('keyup', checkInputNumber());
  inputPhoneNumberEl.addEventListener('keyup', checkInputNumber());

  // 계좌 추가 modal Open
  btnCreateAccount.addEventListener('click', async () => {
    const createAbleBankList = Array.from(await getBankList()).filter(
      (x) => x.disabled === false,
    );
    createBankAccountList(
      dicCreateAccount.querySelector('.modal__container'),
      createAbleBankList,
    );
    dicCreateAccount.style.display = 'block';
  });

  // 계좌 추가 modal Close
  btnCloseModal.addEventListener('click', () => {
    dicCreateAccount.querySelector('ul').innerHTML = '';
    dicCreateAccount.style.display = 'none';
  });

  // 계좌 생성 버튼
  btnFinalCreate.addEventListener('click', () => {
    const bankCode = getSelectBank();
    createUserAccount(bankCode);
  });
}

// 삭제 예정
btnGetList.addEventListener('click', () => {
  // mypage__account.style.backgroundImage = 'none';
  temporaryEl.style.display = 'none';
});

// API : 은행 목록
const getBankList = async () => {
  const res = await fetch(`${base_url}/account/banks`, {
    method: 'GET',
    headers: {
      ...headers,
      Authorization: `Bearer ${window.localStorage.getItem('token')}`,
    },
  });
  const json = await res.json();

  return json;
};

// API : 계좌 조회
const getUserAccounts = async () => {
  const res = await fetch(`${base_url}/account`, {
    method: 'GET',
    headers: {
      ...headers,
      Authorization: `Bearer ${window.localStorage.getItem('token')}`,
    },
  });
  const json = await res.json();

  return json;
};

// API : 계좌 개설
const createUserAccount = async (bankCode) => {
  const res = await fetch(`${base_url}/account`, {
    method: 'POST',
    headers: {
      ...headers,
      Authorization: `Bearer ${window.localStorage.getItem('token')}`,
    },
    body: JSON.stringify({
      bankCode: bankCode,
      accountNumber: document.querySelector('#input__account').value,
      phoneNumber: document.querySelector('#input__phone').value,
      signature: true,
    }),
  });

  if (res.ok) {
    // router.navigate('/mypage/heart');
    // router.navigate('/mypage/account');
    renderPage(htmlMypage_Account);
    initFunc();
  }
};

// API : 계좌 해지
const deleteAccount = async (e) => {
  const accountId = e.target.dataset.id;
  const res = await fetch(`${base_url}/account`, {
    method: 'DELETE',
    headers: {
      ...headers,
      Authorization: `Bearer ${window.localStorage.getItem('token')}`,
    },
    body: JSON.stringify({
      accountId: accountId,
      signature: true,
    }),
  });

  if (res.ok) {
    renderPage(htmlMypage_Account);
    initFunc();
  }

  const json = await res.json();
  return json;
};

// Input Tag Custom : 숫자만 입력 가능
function checkInputNumber() {
  return (e) => {
    if (e.key === /[0-9]/) {
    } else {
      e.target.value = e.target.value
        .replace(/[^0-9.]/g, '')
        .replace(/(\..*)\./g, '$1');
    }
  };
}

// 등록 가능한 은행 목록을 가져와 은행 이름과 계좌번호 형식과 Render
const createBankAccountList = (div, data) => {
  const ulEl = div.querySelector('ul');
  const liEls = data.map((_data) => {
    const liEl = document.createElement('li');
    liEl.innerHTML = /* html */ `
    <input type="radio" name="bank" class="selectBank">
    ${_data.name}, [${_data.digits}]
    `;
    liEl.dataset.code = _data.code;

    return liEl;
  });
  ulEl.append(...liEls);
};

// 계좌 개설 시, 사용자가 선택한 은행Code를 가져옴
const getSelectBank = () => {
  const checkBoxs = document.querySelectorAll('.selectBank');
  const bchecked = Array.from(checkBoxs).every((x) => x.checked === false);

  if (bchecked === true) {
    alert('Check');
    return;
  } else {
    const liEl = Array.from(checkBoxs).find(
      (x) => x.checked === true,
    ).parentElement;
    return liEl.dataset.code;
  }
};

// 사용자의 계좌를 전부 보여준다
const showUserAccounts = (div, datas) => {
  const totalBalance = document.createElement('span');
  totalBalance.textContent = `총 계좌 잔액 : ${datas.totalBalance.toLocaleString()}`;
  totalBalance.classList.add('total__balance');
  const UserAccountList = div.querySelector('ul');

  if (datas.accounts.length === 0) {
    const pNotExistAccountEl = document.createElement('p');
    pNotExistAccountEl.textContent = '등록된 계좌가 없습니다';
    Object.assign(pNotExistAccountEl.style, {
      textAlign: 'center',
      padding: '50px',
    });

    UserAccountList.append(pNotExistAccountEl);
    return;
  }
  const accounts = datas.accounts;

  const totalBalanceEl = div.querySelector('p');

  const liEls = accounts.map((data) => {
    const liEl = document.createElement('li');

    const bankName = document.createElement('h4');
    bankName.innerHTML = `${data.bankName}`;

    const accountNumber = document.createElement('p');
    accountNumber.innerHTML = `${data.accountNumber}`;

    const balance = document.createElement('span');
    balance.innerHTML = `${data.balance.toLocaleString()}`;

    const btnDeleteAccount = document.createElement('button');
    btnDeleteAccount.textContent = '삭제';
    btnDeleteAccount.id = 'btnDeleteAccount';
    btnDeleteAccount.dataset.id = data.id;

    btnDeleteAccount.addEventListener('click', async (event) => {
      showDeleteAccountModal(event);
    });

    liEl.append(bankName, accountNumber, balance, btnDeleteAccount);

    return liEl;
  });
  UserAccountList.append(...liEls);
  totalBalanceEl.append(totalBalance);
};

// 계좌 삭제 Click시 modal Open
const showDeleteAccountModal = (event) => {
  const divDeleteAccount = document.querySelector('.delete__account');
  divDeleteAccount.style.display = 'block';

  document.querySelector('#delete-ok').addEventListener('click', async () => {
    const result = await deleteAccount(event);
    if (result === false) {
      alert('삭제 오류');
    }
  });

  document.querySelector('#delete-cancel').addEventListener('click', () => {
    divDeleteAccount.style.display = 'none';
  });
};

// const

// 엑세스 토큰때문에 임시..
const idEl = document.querySelector('.id');
const passwordEl = document.querySelector('.password');
const displayNameEl = document.querySelector('.display-name');
const submitEl = document.querySelector('.signup');
const authorizationEl = document.querySelector('.authorization');
const loginEl = document.querySelector('.login');
// const btnLogout = document.querySelector('.logout')

let id = '';
let pw = '';
let displayName = '';

idEl.addEventListener('input', (event) => {
  id = event.target.value;
});
passwordEl.addEventListener('input', (event) => {
  pw = event.target.value;
});
displayNameEl.addEventListener('input', (event) => {
  displayName = event.target.value;
});
submitEl.addEventListener('click', () => {
  request({
    url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/signup',
    method: 'POST',
    data: {
      email: id,
      password: pw,
      displayName: displayName,
    },
  });
});
authorizationEl.addEventListener('click', async () => {
  request({
    url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/me',
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      masterKey: true,
    },
  });
});
loginEl.addEventListener('click', async () => {
  loginEl.textContent = '로그인 시도 중...';
  await request({
    url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/login',
    method: 'POST',
    data: {
      email: id,
      password: pw,
    },
  });
  loginEl.textContent = '로그인 완료';
});
// btnLogout.addEventListener('click', () => {
//   request({
//     url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/logout',
//     method: 'POST',
//     headers: {
//       ...headers,
//       Authorization: `Bearer ${window.localStorage.getItem('token')}`
//     }
//   })
// })

async function request(options) {
  const defaultOptions = {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      apikey: 'FcKdtJs202301',
      username: user_name,
    },
  };
  const headers = options.headers || {};
  const res = await fetch(options.url, {
    method: options.method || defaultOptions.method,
    headers: {
      ...defaultOptions.headers,
      ...headers,
    },
    body: options.data ? JSON.stringify(options.data) : undefined,
  });
  const json = await res.json();
  window.localStorage.setItem('token', json.accessToken);
}

// dotenv 사용 예시
import dotenv from 'dotenv';
import Navigo from 'navigo';
import { doc } from 'prettier';
import { base_url, api_key, user_name, admin_email } from '../db.js';
dotenv.config();
window.localStorage.clear() // TODO : 삭제

const headers = {
  'content-type': 'application/json',
  'apikey': api_key,
  'username': user_name
}

const btnGetList = document.querySelector('.getlist')
const temporaryEl = document.querySelector('.temporary')
const divAccountNumber = document.querySelector('.accountNumber')
const divPhoneNumber = document.querySelector('.phoneNumber')

const myPageAccountContainer = document.querySelector('.mypage__account__container')
btnGetList.textContent = '은행 목록 가져오기'
myPageAccountContainer.innerText = ''

const router = new Navigo('/')

router.on({
  '/mypage/order': () => {
    myPageAccountContainer.innerText = ''
  },
  '/mypage/account': async () => {
    myPageAccountContainer.innerHTML = /* HTML */`
      <div class="mypage__account__wrapper">
        <div class="mypage__account__header">
          <h1>계좌 관리</h1>
        </div>
        <div class="user__account">
          <p>총 계좌 잔액: </p>
          <ul></ul>
          <div></div>
        </div>
      </div>
      <div class="create__account">
        <div class="create__account__modal">
          <div class="modal__contaier">
            <ul></ul>
            <div class="accountNumber">
              <input type="number"/>
            </div>
            <div class="phoneNumber">
              <input type="number"/>
            </div> 
          </div>
        </div>
      </div>
    `
  const myPageAccountWrapper = document.querySelector('.mypage__account__wrapper')
  const divUserAccount = document.querySelector('.user__account')
  const dicCreateAccount = document.querySelector('.create__account')

  const UserAccounts = await getUserAccounts()
  showUserAccounts(divUserAccount, UserAccounts)
  const btnCreateAccount = document.createElement('button') 
  btnCreateAccount.classList.add('btn__create__account')
  btnCreateAccount.innerText = '계좌추가!'
  divUserAccount.querySelector('div').append(btnCreateAccount)

  btnCreateAccount.addEventListener('click', async () => {
    dicCreateAccount.style.display = 'block'
    const bankList = await getBankList()
    createBankAccountList(dicCreateAccount, bankList)
    // const bankCode = getSelectBank()
    // console.log(bankCode)
  })
  },
  '/mypage/heart': () => {
    myPageAccountContainer.innerText = ''

  },
  '/mypage/modify': () => {
    myPageAccountContainer.innerText = ''
  }
})
function renderPage() {

}





btnGetList.addEventListener('click', async () => {

  const UserAccounts = await getUserAccounts()
  // showUserAccounts(UserAccounts)
  console.log(UserAccounts)
  // const bankList = await getBankList()
  //createBankAccountList(bankList)
  temporaryEl.style.display = 'none'
  // btnCreateAccount.style.display = 'block'
  // document.querySelector('section').style.display = 'flex'
  //createBankAccountInputs()
  
})



const getBankList = async () => {
  const res = await fetch(`${base_url}/account/banks`, {
    method: 'GET',
    headers: {
      ...headers,
      Authorization: `Bearer ${window.localStorage.getItem('token')}`
    }
  })
  const json = await res.json()

  return json
}

const getUserAccounts = async () => {
  const res = await fetch(`${base_url}/account`, {
    method: 'GET',
    headers: {
      ...headers,
      Authorization: `Bearer ${window.localStorage.getItem('token')}`
    }
  })
  const json = await res.json()
  // console.log(json)

  return json
}

const createUserACcount = async () => {
  const res = await fetch(`${base_url}/account`, {
    method: 'POST',
    headers: {
      ...headers,
      Authorization: `Bearer ${window.localStorage.getItem('token')}`
    },
    body: JSON.stringify({
      bankCode: bankCode,
      accountNumber: document.querySelector('.input-account').value,
      phoneNumber: document.querySelector('.input-phone').value,
      signature: true
    })
  })
  const json = await res.json()
  return json()
} 

const createBankAccountList = (div, data) => {
  const ulEl = div.querySelector('ul')
  const liEls = data.map(_data => {
    const liEl = document.createElement('li')
    liEl.innerHTML = /* html */ `
    <input type="radio" name="bank" class="selectBank">
    ${_data.name}, ${_data.code}, [${_data.digits}], ${_data.disabled}
    `
    liEl.dataset.id = _data.code


    return liEl
  })
  ulEl.append(...liEls)

}

const createBankAccountInputs = () => {
  // 계좌번호
  const span = document.createElement('span')
  span.innerText = '계좌번호'
  const inputAccount = document.createElement('input')
  inputAccount.classList.add('input__account')
  divAccountNumber.append(span)
  divAccountNumber.append(inputAccount)

  // 핸드폰 번호
  const span2 = document.createElement('span')
  span2.innerText = '핸드폰번호'
  const inputAccount2 = document.createElement('input')
  inputAccount2.classList.add('input__phone')
  divPhoneNumber.append(span2)
  divPhoneNumber.append(inputAccount2)
}

const getSelectBank = () => {
  const checkBoxs = document.querySelectorAll('.selectBank')
  const bchecked = false 
  //Array.from(checkBoxs).every(x => x.checked === false)
  
  if(bchecked === true){
    alert('Check')
    return
  }
  else{
    const liEl = Array.from(checkBoxs).find(x => x.checked === true).parentElement
    return liEl.dataset.id
  }  
}



const showUserAccounts = (div, datas) => {
  const accounts = datas.accounts
  const totalBalance = document.createElement('span')
  totalBalance.textContent = `${datas.totalBalance.toLocaleString()}`
  totalBalance.classList.add('total__balance')

  const UserAccountList = div.querySelector('ul')
  const totalBalanceEl = div.querySelector('p')


  const liEls = accounts.map(data => {
    const liEl = document.createElement('li')

    console.log(data)
    const bankName = document.createElement('span')
    bankName.innerHTML = `${data.bankName} &nbsp;` 

    const accountNumber = document.createElement('span')
    accountNumber.innerHTML = `| ${data.accountNumber} |` 

    const balance = document.createElement('span')
    balance.innerHTML = `&nbsp;${data.balance.toLocaleString()}`

    const btnDeleteAccount = document.createElement('button')
    btnDeleteAccount.textContent = '삭제'

    liEl.append(bankName, accountNumber, balance, btnDeleteAccount)

    return liEl
  })
  UserAccountList.append(...liEls)
  totalBalanceEl.append(totalBalance)
}























// const 

// 엑세스 토큰때문에 임시..
const idEl = document.querySelector('.id')
const passwordEl = document.querySelector('.password')
const displayNameEl = document.querySelector('.display-name')
const submitEl = document.querySelector('.signup')
const authorizationEl = document.querySelector('.authorization')
const loginEl = document.querySelector('.login')
// const btnLogout = document.querySelector('.logout')

let id = ''
let pw = ''
let displayName = ''

idEl.addEventListener('input', event => {
  id = event.target.value
})
passwordEl.addEventListener('input', event => {
  pw = event.target.value
})
displayNameEl.addEventListener('input', event => {
  displayName = event.target.value
})
submitEl.addEventListener('click', () => {
  console.log(id, pw, displayName)
  request({
    url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/signup',
    method: 'POST',
    data: {
      email: id,
      password: pw,
      displayName: displayName,
    }
  })
})
authorizationEl.addEventListener('click', async () => {
  request({
    url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/me',
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      masterKey: true
    }
  })
})
loginEl.addEventListener('click', () => {
  request({
    url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/login',
    method: 'POST',
    data: {
      email: id,
      password: pw
    }
  })
})
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
      "content-type": "application/json",
      "apikey": "FcKdtJs202301",
      "username": user_name
    }
  }
  const headers = options.headers || {}
  const res = await fetch(options.url, {
    method: options.method || defaultOptions.method,
    headers: {
      ...defaultOptions.headers,
      ...headers
    },
    body: options.data
      ? JSON.stringify(options.data)
      : undefined
  })
  const json = await res.json()
  console.log(json)
  window.localStorage.setItem('token', json.accessToken)
}
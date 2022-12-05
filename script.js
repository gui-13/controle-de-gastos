const listBills = document.querySelector('.list-bills')
const balance = document.querySelector('.balance-bills')
const accountName = document.querySelector('#account-name')
const expiration = document.querySelector('#expiration')
const balanceValue = document.querySelector('#balance-value')
const form = document.querySelector('.create-bills')

const localStoregeTransactions = JSON.parse(localStorage.getItem('transactions'))

let transactions = localStorage.getItem('transactions') !== null ? localStoregeTransactions : []

const removeTransaction = ID => {
  transactions = transactions.filter(transaction => 
    transaction.id !== ID)
  updateLocalStorage()
  init()
}

const addElementIntoDOM = transaction => {
  const li = document.createElement('li')

  li.classList.add('item-bills')

  li.innerHTML = `
    <div class="account">
      <img class="icon-bills" src="/assets/default-icon.svg">
      <span>${transaction.name}</span>
    </div>
    <div class="account-item-expiration">
      <p>Vencimento ${transaction.expiration}</p>
    </div>
    <div class="account-item-value">
      <span>R$ ${transaction.amount}</span>
    </div>
    <button class="delete-btn" onClick="removeTransaction(${transaction.id})">
    x
  </button>
  `
  listBills.prepend(li)
  
  function setIcon(icon) {
    const iconBills = document.querySelector('.icon-bills')

    const icons = {
      nubank: ['/assets/nubank.svg'],
      carrefour: ['/assets/carrefour.svg'],
      tim: ['/assets/tim.svg'],
      samsung: ['/assets/samsung.svg'],
      atacadao: ['/assets/atacadao.svg'],
    }

    if (icons[icon]) {
      iconBills.setAttribute('src', icons[icon][0])
    }
    
  } 
  setIcon(transaction.name)
}

const updateBalanceValues= () => {
  const transactionsAmounts = transactions.map(transaction => transaction.amount)
  const total = transactionsAmounts.reduce((accumulador, transaction) => accumulador + transaction, 0).toFixed(2)

  balance.textContent = `R$ ${total}`
}

const init = () => {
  listBills.innerHTML = ''
  transactions.forEach(addElementIntoDOM)
  updateBalanceValues()
}

init()

function updateLocalStorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions))
}

const generateID = () => Math.round(Math.random() * 1000)

form.addEventListener('submit', event => {

  event.preventDefault()

   const transactionName = accountName.value.trim()
   const transactionAmount = balanceValue.value.trim()
   const transactionExpiration = expiration.value.trim()

   if(transactionName === '' || transactionAmount === '' || transactionExpiration === '') {
    alert('Por favor, preencha todos os campos')
    return
   }

   const transaction = {
    id: generateID(),
    name: String(transactionName).toLowerCase(),
    amount: Number(transactionAmount.replace(',', '.')),
    expiration: Number(transactionExpiration),
  }

  transactions.push(transaction)
  init()
  updateLocalStorage()

  accountName.value = ''
  balanceValue.value = ''
  expiration.value = ''
})

// theme switcher

const body = document.body
const btnTheme = document.querySelector('.btn-theme')

btnTheme.addEventListener('click', toggleIcon)

function toggleIcon() {
  if(!btnTheme.classList.contains('dark') && !btnTheme.classList.contains('light')) {
    btnTheme.classList.add('dark')
  } else if(btnTheme.classList.contains('dark')) {
    btnTheme.classList.remove('dark')
    btnTheme.classList.add('light')  
  } else if(btnTheme.classList.contains('light')) {
    btnTheme.classList.remove('light')
    btnTheme.classList.add('dark') 
  }
}

btnTheme.addEventListener('click', toggleTheme)

function toggleTheme() {
  const isActive = btnTheme.classList.contains('dark')
  if(isActive) {
    body.style.backgroundColor = "var(--dark)"
  }else {
    body.style.backgroundColor = "var(--light)"
  }
}



   


  
 
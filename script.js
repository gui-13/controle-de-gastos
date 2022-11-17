const listBills = document.querySelector('.list-bills')
const balance = document.querySelector('.balance-bills')
const accountName = document.querySelector('#account-name')
const expiration = document.querySelector('#expiration')
const balanceValue = document.querySelector('#balance-value')
const form = document.querySelector('.create-bills')


// Configura o Local Storege
const localStoregeTransactions = JSON.parse(localStorage.getItem('transactions'))

let transactions = localStorage.getItem('transactions') !== null ? localStoregeTransactions : []

const removeTransaction = ID => {
  // Remove uma transação pelo ID e atualiza no Local Storage e na página
  transactions = transactions.filter(transaction => 
    transaction.id !== ID)
  updateLocalStorage()
  init()
}



// Adiciona um elemento na página quando o botão ADD é clicado
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


// Atualiza os valores 

const updateBalanceValues= () => {
  const transactionsAmounts = transactions.map(transaction => transaction.amount)
  const total = transactionsAmounts.reduce((accumulador, transaction) => accumulador + transaction, 0).toFixed(2)

  balance.textContent = `R$ ${total}`
}

const init = () => {
  // Executa o preenchimento na página
  listBills.innerHTML = ''
  transactions.forEach(addElementIntoDOM)
  updateBalanceValues()
}

init()


// Atualiza a chave transactions do Local Storage para o array 
  // ... de transações em forma de string
function updateLocalStorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions))
}

// Gera um ID aleatório
const generateID = () => Math.round(Math.random() * 1000)


form.addEventListener('submit', event => {
  // Escuta o submit do form para verificar se inputs estão
  // ... preenchidos e adicionar no array de transações]
  event.preventDefault()

   const transactionName = accountName.value.trim()
   const transactionAmount = balanceValue.value.trim()
   const transactionExpiration = expiration.value.trim()

   if(transactionName === '' || transactionAmount === '' || transactionExpiration === '') {
    alert('Por favor, preencha todos os campos')
    return
   }

   //cria o objeto 
   const transaction = {
    id: generateID(),
    name: String(transactionName).toLowerCase(),
    amount: Number(transactionAmount),
    expiration: Number(transactionExpiration),
  }

   // Adiciona no array de transações, preenche na página e 
  // ... atualiza no Local Storage
  transactions.push(transaction)
  init()
  updateLocalStorage()

  // Limpa os inputs
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



   


  
 
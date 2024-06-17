const PORT = 9998
const id = window.sessionStorage.getItem('id')
const username = window.sessionStorage.getItem('username')
const token = window.sessionStorage.getItem('token')

if (!token) window.location.href = '/index.html'

const fetchBalance = async () => {
  try {
    const response = await fetch(`http://localhost:${PORT}/api/banking-operation/balance/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    const data = await response.json()
    return data.balance
  } catch (error) {
    console.error(error)
    window.location.href = '/index.html'
  }
}

const fetchDeposit = async (amount) => {
  try {
    await fetch(`http://localhost:${PORT}/api/banking-operation/deposit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        username,
        amount
      })
    }
    )
  } catch (error) {
    console.error(error)
  }
}

const displayUsername = (username) => {
  document.getElementById('usernameGlobal').innerText = username
}
displayUsername(username)

const displayBalance = async () => {
  const balance = await fetchBalance()
  document.getElementById('totalBalance').innerText = `$ ${balance}`
}
displayBalance()

document.getElementById('userinfoDeposit').addEventListener('submit', async (event) => {
  event.preventDefault()

  try {
    const amount = document.getElementById('depositAmount').value
    await fetchDeposit(amount)
    createModal()
    displayBalance()
    document.getElementById('depositAmount').value = ''
  } catch (error) {
    console.error(error)
  }
})

const createModal = () => {
  const div = document.createElement('div')
  div.className = 'bgSucess'

  const article = document.createElement('article')
  article.className = 'cardSuccess'

  const p1 = document.createElement('p')
  p1.textContent = 'Deposit made'

  const p2 = document.createElement('p')
  p2.textContent = 'with '

  const span = document.createElement('span')
  span.textContent = 'success'

  p2.appendChild(span)

  article.appendChild(p1)
  article.appendChild(p2)

  div.appendChild(article)

  document.body.appendChild(div)

  setTimeout(() => {
    div.remove()
  }, 3000)
}

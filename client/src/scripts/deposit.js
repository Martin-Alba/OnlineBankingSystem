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
    displayBalance()
    document.getElementById('depositAmount').value = ''
  } catch (error) {
    console.error(error)
  }
})

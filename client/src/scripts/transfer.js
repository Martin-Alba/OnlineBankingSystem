const PORT = 9998
const id = window.sessionStorage.getItem('id')
const username = window.sessionStorage.getItem('username')
const token = window.sessionStorage.getItem('token')
const fromUsername = username

if (!token) window.location.href = '/index.html'

const jsonUrlBalance = async () => {
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

const fetchTransfer = async (amount, toUsername) => {
  try {
    await fetch(`http://localhost:${PORT}/api/banking-operation/transfer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        fromUsername,
        toUsername,
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
  const balance = await jsonUrlBalance()
  document.getElementById('totalBalance').innerText = `$ ${balance}`
}
displayBalance()

document.getElementById('userinfoTransfer').addEventListener('submit', async (event) => {
  event.preventDefault()

  try {
    const amount = document.getElementById('transferAmount').value
    const toUsername = document.getElementById('transferToUsername').value
    await fetchTransfer(amount, toUsername)
    displayBalance()
    document.getElementById('transferAmount').value = ''
    document.getElementById('transferToUsername').value = ''
  } catch (error) {
    console.error(error)
  }
})

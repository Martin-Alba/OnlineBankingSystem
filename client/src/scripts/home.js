const PORT = 9998
const id = window.sessionStorage.getItem('id')
const username = window.sessionStorage.getItem('username')
const token = window.sessionStorage.getItem('token')

if (!token) window.location.href = '/index.html'

const balanceFetch = async () => {
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
  } catch (err) {
    console.error(err)
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const balance = await balanceFetch()
    console.log(`Balance: ${balance}`)

    const displayUsername = (username) => {
      document.getElementById('usernameGlobal').innerText = username
    }
    displayUsername(username)
    const displayBalance = (balance) => {
      console.log(`Balance display: ${balance}`)
      document.getElementById('totalBalance').innerText = `$ ${balance}`
    }
    displayBalance(balance)
  } catch (error) {
    console.error(error)
  }
})

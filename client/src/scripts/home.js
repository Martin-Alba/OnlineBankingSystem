const PORT = 9998
const id = window.sessionStorage.getItem('id')
const username = window.sessionStorage.getItem('username')

const jsonUrl = `http://localhost:${PORT}/api/banking-operation/balance/${id}`

document.addEventListener('DOMContentLoaded', async () => {
  // Fetch the JSON data
  try {
    const response = await fetch(jsonUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    console.log(response)
    const data = await response.json()
    const balance = data.balance
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

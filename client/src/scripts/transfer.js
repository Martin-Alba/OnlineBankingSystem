const PORT = 9998
const id = window.sessionStorage.getItem('id')
const username = window.sessionStorage.getItem('username')
const fromUsername = username

const jsonUrl = `http://localhost:${PORT}/api/banking-operation/balance/${id}`
const jsonUrlTransfer = `http://localhost:${PORT}/api/banking-operation/transfer`

const jsonUrlBalance = async () => {
  try {
    const response = await fetch(jsonUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json()
    return data.balance
  } catch (error) {
    console.error(error)
  }
}

const fetchTransfer = async (amount, toUsername) => {
  try {
    const sendTransference = await fetch(jsonUrlTransfer, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
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

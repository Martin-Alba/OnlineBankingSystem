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
    createModalError()
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
    createModalSuccess()
    displayBalance()
    document.getElementById('transferAmount').value = ''
    document.getElementById('transferToUsername').value = ''
  } catch (error) {
    console.error(error)
  }
})

const createModalSuccess = () => {
  const div = document.createElement('div')
  div.className = 'bgSucess'

  const article = document.createElement('article')
  article.className = 'cardSuccess'

  const p1 = document.createElement('p')
  p1.textContent = 'Transfer made'

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

const createModalError = () => {
  const div = document.createElement('div')
  div.className = 'bgError'

  const article = document.createElement('article')
  article.className = 'cardError'

  const p1 = document.createElement('p')
  p1.textContent = 'There was an'

  const span1 = document.createElement('span')
  span1.textContent = ' error'

  const p2 = document.createElement('p')
  p2.textContent = 'in your'

  const span2 = document.createElement('span')
  span2.textContent = ' request'

  p1.appendChild(span1)
  p2.appendChild(span2)

  article.appendChild(p1)
  article.appendChild(p2)

  div.appendChild(article)

  document.body.appendChild(div)

  setTimeout(() => {
    div.remove()
  }, 3000)
}

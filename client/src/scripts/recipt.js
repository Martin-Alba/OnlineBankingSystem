const PORT = 9998
const id = window.sessionStorage.getItem('id')
const token = window.sessionStorage.getItem('token')

if (!token) window.location.href = '/index.html'

const fetchReceipt = async () => {
  try {
    const response = await fetch(`http://localhost:${PORT}/api/tickets/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
    throw new Error('Failed to fetch receipt data')
  }
}

const displayReceipts = (receipts) => {
  if (receipts.length === 0) {
    window.alert('There are no receipts to display')
  } else {
    receipts.forEach(receipt => {
      const { user, operation, amount, date } = receipt
      window.alert(`User: ${user}, Operation: ${operation}, Amount: ${amount}, Date: ${date}`)
    })
  }
}

const mapReceipt = async () => {
  try {
    const receiptData = await fetchReceipt()
    return receiptData.map(data => ({
      user: data.username,
      operation: data.operation,
      amount: data.amount,
      date: data.date
    }))
  } catch (error) {
    console.error(error)
    throw new Error('Failed to map receipt data')
  }
}

const reciptHandler = async () => {
  try {
    const receiptData = await fetchReceipt()
    displayReceipts(receiptData)
  } catch (error) {
    console.error(error.message)
  }
}

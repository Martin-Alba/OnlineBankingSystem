const PORT = 9998
const jsonUrl = `http://localhost:${PORT}/api/banking-operation/balance/${id}`

document.addEventListener('DOMContentLoaded', async () => {
  const username = sessionStorage.getItem('username')

  function formatData (data) {
    const formattedData = data.map(item => {
      return {
        id: item.id
      }
    })
    return formattedData
  }

  // Fetch the JSON data
  try {
    const response = await fetch(jsonUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.parse(formatData(data))
    })

    if (response.ok) {
      const data = await response.json()
      console.log(data)
    } else {
      const errorData = await response.json()
      console.error(errorData)
    }
  } catch (error) {
    console.error(error)
  }
})

// Function to display the balance
function displayBalance (balance) {
  // Find the element where you want to display the balance
  const balanceElement = document.getElementById('totalBalance')
  // Update the balance element with the retrieved balance
  balanceElement.textContent = `Balance: $${balance}`
}

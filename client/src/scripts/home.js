const PORT = 9998;

// Get the username from the session storage
document.addEventListener('DOMContentLoaded',  () => {
    const id = sessionStorage.getItem('username');
    console.log(id);
})

const jsonUrl = `http://localhost:${PORT}/api/banking-operation/balance/${id}`;
// Fetch the JSON data
fetch(jsonUrl)
  .then(response => response.json())
  .then(data => {
    // Display the balance
    displayBalance(data.balance);
  })
  .catch(error => {
    console.log('Error:', error);
  });

// Function to display the balance
function displayBalance(balance) {
  // Find the element where you want to display the balance
  const balanceElement = document.getElementById('totalBalance');

  // Update the balance element with the retrieved balance
  balanceElement.textContent = `Balance: $${balance}`;
}
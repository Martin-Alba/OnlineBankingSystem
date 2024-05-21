const PORT = 9998;

const jsonUrl = `http://localhost:${PORT}/api/banking-operation/balance/${id}`;
// Fetch the JSON data
fetch(jsonUrl)
    .then((response) => response.json())
    .then((data) => {
        const formattedData = formatData(data);
        displayData(formattedData);
    })
    .catch((error) => {
        console.log("Error:", error);
    });


function formatData(data) {
    const formattedData = data.map((item) => {
    return {
      amount: item.amount.toFixed(2), // Format the amount as a currency
    };
    });

    return formattedData;
}

// Function to display the data on the page
function displayData(data) {
    const container = document.getElementById("totalBalance");
    container.innerHTML = "";

    data.forEach((item) => {
    const div = document.createElement("div");
    div.textContent = `Amount: $${item.amount}`;
    container.appendChild(div);
    });
}

const PORT = 9998

function handleButtonClick(titleValue, buttonToAddClass, buttonToRemoveClass) {
    title.innerHTML = titleValue;
    buttonToAddClass.classList.add("disable");
    buttonToRemoveClass.classList.remove("disable");
}

document.addEventListener("DOMContentLoaded", function () {
    let signUpBtn = document.getElementById("signUpBtn");
    let signInBtn = document.getElementById("signInBtn");

    signInBtn.onclick = function () {
        handleButtonClick("Sign In", signUpBtn, signInBtn);
    }

    signUpBtn.onclick = function () {
        handleButtonClick("Sign Up", signInBtn, signUpBtn);
    }
});


function formDataToJson(formData) {
    let jsonObject = {};
    for (const [key, value] of formData.entries()) {
        jsonObject[key] = value;
    }
    return jsonObject;
}

document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('userinfo');

    formulario.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(formulario);
        const jsonObject = formDataToJson(formData);


        const action = event.submitter.dataset.action;

        try {
            const response = await fetch(`http://localhost:${PORT}/api/users/${action}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(jsonObject)
            });
            if (response.ok) {
                const data = await response.json();
                console.log('Exito:', data);
                /*Save user in localStorage*/
                action === 'login' ? sessionStorage.setItem('username', jsonObject.username) : sessionStorage.clear();
                /*Redirect*/
                location.href = "/src/pages/home.html";
            } else {
                const errorData = await response.json();
                console.error('Error:', errorData);

                alert(errorData.message);
            }

        } catch (error) {
            console.error('Error de red:', error);
        }
    });
});

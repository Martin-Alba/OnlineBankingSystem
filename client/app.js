const PORT = 9998

function handleButtonClick (titleElement, titleValue, buttonToAddClass, buttonToRemoveClass) {
  titleElement.innerHTML = titleValue
  buttonToAddClass.classList.add('disable')
  buttonToRemoveClass.classList.remove('disable')
}

document.addEventListener('DOMContentLoaded', function () {
  const title = document.getElementById('title')
  const signUpBtn = document.getElementById('signUpBtn')
  const signInBtn = document.getElementById('signInBtn')

  signInBtn.onclick = function () {
    handleButtonClick(title, 'Sign In', signUpBtn, signInBtn)
  }

  signUpBtn.onclick = function () {
    handleButtonClick(title, 'Sign Up', signInBtn, signUpBtn)
  }
})

function formDataToJson (formData) {
  const jsonObject = {}
  for (const [key, value] of formData.entries()) {
    jsonObject[key] = value
  }
  return jsonObject
}

document.addEventListener('DOMContentLoaded', () => {
  const formulario = document.getElementById('userinfo')

  formulario.addEventListener('submit', async (event) => {
    event.preventDefault()
    const formData = new FormData(formulario)
    const jsonObject = formDataToJson(formData)

    const action = event.submitter.dataset.action

    try {
      const response = await fetch(`http://localhost:${PORT}/api/users/${action}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonObject)
      })

      if (response.ok) {
        const data = await response.json()
        /* Save user in localStorage */
        const storageDataLogin = () => {
          window.sessionStorage.setItem('username', jsonObject.username)
          window.sessionStorage.setItem('id', data.id)
          window.location.href = '/src/pages/home.html'
        }
        const storageDataRegister = () => {
          window.sessionStorage.clear()
          window.alert('User created successfully')
        }
        action === 'login' ? storageDataLogin() : storageDataRegister()

        /* Redirect */
      } else {
        const errorData = await response.json()
        window.alert(errorData.message)
      }
    } catch (error) {
      console.error('Error de red:', error)
    }
  })
})

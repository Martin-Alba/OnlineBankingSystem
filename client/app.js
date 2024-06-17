const PORT = 9998

const handleButtonClick = (titleElement, titleValue, buttonToAddClass, buttonToRemoveClass) => {
  titleElement.innerText = titleValue
  buttonToAddClass.classList.add('disable')
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

const formDataToJson = (formData) => {
  const dataForm = {}
  for (const [key, value] of formData.entries()) {
    dataForm[key] = value
  }
  return dataForm
}

const handleFetch = async (action, dataForm) => {
  try {
    const response = await fetch(`http://localhost:${PORT}/api/users/${action}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataForm)
    })
    return response
  } catch (err) {
    console.error(err)
  }
}

const handleResponse = async (response, action, dataForm) => {
  if (!response.ok) {
    const errorData = await response.json()
    window.alert(errorData.message)
    return
  }

  const data = await response.json()
  action === 'login' ? storageDataLogin(data, dataForm) : storageDataRegister()
}

const storageDataLogin = (data, dataForm) => {
  window.sessionStorage.setItem('username', dataForm.username)
  window.sessionStorage.setItem('id', data.id)
  window.sessionStorage.setItem('token', data.token)
  window.location.href = '/src/pages/home.html'
}

const storageDataRegister = () => {
  window.sessionStorage.clear()

  const createModal = () => {
    const div = document.createElement('div')
    div.className = 'bgSucess'

    const article = document.createElement('article')
    article.className = 'cardSuccess'

    const p1 = document.createElement('p')
    p1.textContent = 'User created'

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

  createModal()
}

document.addEventListener('DOMContentLoaded', () => {
  const formulario = document.getElementById('userinfo')

  formulario.addEventListener('submit', async (event) => {
    event.preventDefault()
    const formData = new FormData(formulario)
    const dataForm = formDataToJson(formData)

    const action = event.submitter.dataset.action
    try {
      const response = await handleFetch(action, dataForm)
      await handleResponse(response, action, dataForm)
    } catch (error) {
      console.error('Error de red:', error)
    }
  })
})

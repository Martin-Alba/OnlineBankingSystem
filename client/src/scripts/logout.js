window.addEventListener('DOMContentLoaded', (e) => {
  const logoutButton = document.createElement('button')
  logoutButton.textContent = 'Logout'
  logoutButton.addEventListener('click', () => {
    window.sessionStorage.clear()
    window.location.href = '/index.html'
  })

  const logoutContainer = document.querySelector('.btn-logout')
  logoutContainer.appendChild(logoutButton)
})

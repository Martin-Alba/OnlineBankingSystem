window.addEventListener('DOMContentLoaded', (e) => {
  const logoutButton = document.createElement('button')
  const logoutIcon = document.createElement('img')
  logoutIcon.src = '../assets/material-symbols_logout.png'
  logoutIcon.width = '34'
  logoutIcon.height = '34'
  logoutButton.appendChild(logoutIcon)

  logoutButton.addEventListener('click', () => {
    window.sessionStorage.clear()
    window.location.href = '/index.html'
  })

  const logoutContainer = document.querySelector('.btn-logout')
  logoutContainer.appendChild(logoutButton)
})

export function setBlur(e) {
  let sideMenu = document.querySelector('.side_menu')
  let container = document.querySelector('.main')
  let width = sideMenu.getAttribute('style')
  if (!e) {
    sideMenu.setAttribute('style', 'width: 50px; transition: .2s')
    container.setAttribute('style', 'filter: none')
    width = ''
    return
  }
  e.preventDefault()
  if (width && ~width.indexOf('200px')) {
    sideMenu.setAttribute('style', 'width: 50px; transition: .2s')
    container.setAttribute('style', 'filter: none')
    width = ''
  } else {
    sideMenu.setAttribute('style', 'width: 200px; transition: .2s')
    container.setAttribute('style', 'filter: blur(8px)')
  }
}

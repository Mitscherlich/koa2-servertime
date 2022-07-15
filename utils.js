let timer = null
function setCurrentTimer(_timer) {
  timer = _timer
}

function getCurrentTimer() {
  return timer
}

module.exports = {
  setCurrentTimer,
  getCurrentTimer,
}

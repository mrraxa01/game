function State() {
  this.container = null;
  this.btnPlay = null;
  this.btnClose = null;
}

const state = new State();

export function init() {
  state.btnPlay = document.querySelector("#play-game");
  state.btnPlay.addEventListener("click", handleBtnPlayClick);
  state.btnClose = document.querySelector("#close-game");
  state.btnClose.addEventListener("click", handleBtnCloseClick);
  state.container = document.querySelector("#modal-game");
}

function handleBtnPlayClick(event) {
  event.preventDefault();
  state.container.classList.add("active");
}

function handleBtnCloseClick(event) {
  event.preventDefault();
  state.container.classList.remove("active");
}



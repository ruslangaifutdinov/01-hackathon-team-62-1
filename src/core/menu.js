export default class Menu {
  constructor(selector) {
    this.menu = document.querySelector(selector);
    this.Listener();
  }

  Listener() {
    document.body.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      this.open();
    });

    document.body.addEventListener("click", (event) => {
      if (event.target.offsetParent !== this.menu) {
        this.close();
      }
    });
  }

  open() {
    throw new Error(`"open" method should be implemented in Menu"`);
  }

  close() {
    throw new Error(`"close" method should be implemented in Menu"`);
  }

  add() {
    throw new Error(`"add" method should be implemented in Menu"`);
  }
}

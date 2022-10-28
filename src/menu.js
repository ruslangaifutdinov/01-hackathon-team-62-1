import Menu from "./core/menu";

export default class ContextMenu extends Menu {
  constructor(selector) {
    super(selector);
    this.modules = {};
  }

  open() {
    this.menu.classList.add("open");

    const { width, height } = this.menu.getBoundingClientRect();
    if (window.innerWidth - event.clientX < width) {
      this.menu.style.left = event.clientX - width + "px";
    } else {
      this.menu.style.left = event.clientX + "px";
    }
    if (window.innerHeight - event.clientY < height) {
      this.menu.style.top = event.clientY - height + "px";
    } else {
      this.menu.style.top = event.clientY + "px";
    }
  }

  add(module) {
    this.modules = {
      ...this.modules,
      [module.type]: module,
    };

    const menuItem = module.toHTML();

    menuItem.addEventListener("click", (event) => {
      event.preventDefault();
      module.trigger();
      this.close();
    });

    this.menu.append(menuItem);
  }

  close() {
    this.menu.classList.remove("open");
  }
}

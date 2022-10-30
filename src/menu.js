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
      if (!module.notClean) {
        this.modules['timer'].destructor()
        this.modules['message'].destructor()
        this.clean();
      }
      module.trigger();
      this.close();
    });

    this.menu.append(menuItem);
  }

  clean() {
    const items = document.querySelectorAll("body > *:not(.menu)");
    items.forEach((item) => item.remove());
  }

  close() {
    this.menu.classList.remove("open");
  }
}

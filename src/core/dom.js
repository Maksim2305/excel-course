class Dom {
  constructor(selector) {
    this.$el =
      typeof selector === "string"
        ? document.querySelector(selector)
        : selector;
  }

  html(html) {
    if (typeof html === "string") {
      // заполняем страницу элементами
      this.$el.innerHTML = html;
      return this;
    }
    return this.$el.outerHTML.trim();
  }

  clear() {
    this.html("");
    return this;
  }

  append(node) {
    if (node instanceof Dom) {
      node = node.$el;
    }
    if (Element.prototype.append) {
      this.$el.append(node);
    } else {
      this.$el.appendChild(node);
    }
    return this;
  }
  on(eventName, fn) {
    this.$el.addEventListener(eventName, fn);
  }
  off(eventName, fn) {
    this.$el.removeEventListener(eventName, fn);
  }
  closest(selector) {
    // ближайший родитель элемента
    return $(this.$el.closest(selector));
  }
  getCoords() {
    // опеределяем координаты элемента
    return this.$el.getBoundingClientRect(); //
  }

  get data() {
    // находим одинаковые атрибуты в колонке и ячейках
    return this.$el.dataset;
  }

  findAll(selector) {
    // определяем массив по атрибуту выше
    return this.$el.querySelectorAll(selector);
  }

  css(styles = {}) {
    Object.keys(styles).forEach((key) => {
      this.$el.style[key] = styles[key];
    });
  }
}

export function $(selector) {
  return new Dom(selector);
}

$.create = (tagName, classes = "") => {
  // создаем переменную, чтобы она была инстасом класса ДОМ
  const el = document.createElement(tagName);
  if (classes) {
    el.classList.add(classes);
  }
  return $(el);
};

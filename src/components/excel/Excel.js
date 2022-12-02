import { Emitter } from "../../core/Emitter";
import { $ } from "./../../core/dom";

export class Excel {
  constructor(selector, options) {
    this.$el = $(selector);
    this.components = options.components || [];
    this.emitter = new Emitter();
  }

  getRoot() {
    const $root = $.create("div", "excel");
    this.components = this.components.map((Component) => {
      const $el = $.create("div", Component.className);
      const optionsComponent = {
        emitter: this.emitter,
      };
      const component = new Component($el, optionsComponent);
      $el.html(component.toHTML());
      $root.append($el);
      return component;
    });
    return $root;
  }

  render() {
    this.$el.append(this.getRoot());
    this.components.forEach((component) => {
      component.init();
    });
  }

  destoy() {
    this.components.forEach((component) => {
      component.destroy();
    })
  }
}

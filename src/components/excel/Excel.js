import { Emitter } from "../../core/Emitter";
import { StoreSubscriber } from "../../core/storeSubsriber";
import { $ } from "./../../core/dom";

export class Excel {
  constructor(selector, options) {
    this.$el = $(selector);
    this.components = options.components || [];
    this.store = options.store;
    this.emitter = new Emitter();
    this.subscriber = new StoreSubscriber(this.store);
  }

  getRoot() {
    const $root = $.create("div", "excel");
    this.components = this.components.map((Component) => {
      const $el = $.create("div", Component.className);
      const optionsComponent = {
        emitter: this.emitter,
        store: this.store,
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
    this.subscriber.subscribeComponents(this.components);
    this.components.forEach((component) => {
      component.init();
    });
  }

  destoy() {
    this.subscriber.unsunscribeFromStote();
    this.components.forEach((component) => {
      component.destroy();
    });
  }
}


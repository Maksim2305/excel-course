import { method } from "./utils";

export class DomListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error("No root element!");
    }
    this.$root = $root;
    this.listeners = listeners;
  }

  initDOMListeners() {
    this.listeners.forEach((listener) => {
      const method = methodName(listener);
      if (!this[method]) {
        throw new Error(`There is no ${method} method in Events`);
      }
      this[method] = this[method].bind(this)
      this.$root.on(listener, this[method]);
    });
  }
  removeDOMListeners() {
    this.listeners.forEach((listener) => {
      const method = methodName(listener);
      this.$root.off(listener, this[method]);
    })
  }
}

function methodName(listener) {
  return "on" + method(listener);
}

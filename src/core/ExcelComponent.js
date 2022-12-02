import { DomListener } from "./DomListener";

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || "";
    this.emitter = options.emitter;
    this.unsunscribers = [];
    this.prepare();
  }
  prepare() {}

  toHTML() {
    return "";
  }
  // добавляем слушатель
  $emit(event, ...args) {
    this.emitter.emit(event, ...args);
  }
  // подписываемся
  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn);
    this.unsunscribers.push(unsub);
  }

  init() {
    this.initDOMListeners();
  }
  // удаляем события
  destroy() {
    this.removeDOMListeners();
    this.unsunscribers.forEach((unsub) => unsub());
  }
}

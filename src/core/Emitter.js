export class Emitter {
  constructor() {
    this.listeners = {};
  }
  // уведомляем слушателя, если они есть
  // table.emit('table:input', {a: 1})
  emit(event, ...args) {
    if (Array.isArray(this.listeners[event])) {
      this.listeners[event].forEach((listener) => {
        listener(...args);
      });
    }
    return false;
  }
  // подписываемся на уведомления, добавляем нового слушателя

  // table.subscribe("table:select", () => {})
  subscribe(event, fn) {
    this.listeners[event] = this.listeners[event] || [];
    this.listeners[event].push(fn);
    return () => {
      this.listeners[event] = this.listeners[event].filter(
        (listener) => listener !== fn
      );
    };
  }
}

import { $ } from "../../core/dom";

export class TableSelection {
  constructor() {
    this.group = [];
    this.current = null;
  }
  // должно быть инстансом класса DOM
  select($el) {
    this.clear();
    this.group.push($el);
    $el.focus().addClass("selected");
    this.current = $el;
  }

  clear() {
    this.group.forEach(($el) => $el.removeClass("selected"));
    this.group = [];
  }

  selectedGroup($group = []) {
    this.clear();
    this.group = $group;
    this.group.forEach(($el) => {
      $el.addClass("selected");
    });
  }
  applyStyle(style) {
    this.group.forEach(($el) => $el.css(style));
  }
}

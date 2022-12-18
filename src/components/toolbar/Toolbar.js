import { ExcelStateComponent } from "../../core/ExcelStateComponent";
import { createToolbar } from "./toolbar.template";
import { $ } from "../../core/dom";
import { defaultStyles } from "../../constants";

export class Toolbar extends ExcelStateComponent {
  static className = "excel__toolbar";
  constructor($root, options) {
    super($root, {
      name: "Toolbar",
      listeners: ["click"],
      subscribers: ["currentStyles"],
      ...options,
    });
  }

  prepare() {
    this.initState(defaultStyles);
  }

  storeChanged(changes) {
    this.setState(changes.currentStyles)
  }

  get template() {
    return createToolbar(this.state);
  }

  toHTML() {
    return this.template;
  }
  onClick(event) {
    let $target = $(event.target);
    if ($target.data.type === "button") {
      const value = JSON.parse($(event.target).data.value);
      this.$emit("toolbar:applyStyle", value);
      const key = Object.keys(value)[0];
      this.setState({ [key]: value[key] });
    }
  }
}

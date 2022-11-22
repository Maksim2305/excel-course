import { ExcelComponent } from "../../core/ExcelComponent";
import { createTable } from "./table.template";
import { resizeHandler } from "./tableUtils";
export class Table extends ExcelComponent {
  static className = "excel__table";
  constructor($root) {
    super($root, {
      name: "Table",
      listeners: ["mousedown"],
    });
  }
  toHTML() {
    return createTable();
  }
  onInput(event) {
    console.log("table input", event);
  }
  onMousedown(event) {
    if (event.target.dataset.resize) {
      resizeHandler(this.$root, event)
    }
  }
}
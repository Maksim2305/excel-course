import { ExcelComponent } from "../../core/ExcelComponent";
import { createTable } from "./table.template";
import { TableSelection } from "./TableSelection";
import { resizeHandler } from "./tableUtils";
import { $ } from "../../core/dom";
import { matrix, nextCell } from "./tableUtils";
export class Table extends ExcelComponent {
  static className = "excel__table";
  constructor($root, options) {
    super($root, {
      name: "Table",
      listeners: ["mousedown", "keydown", "input"],
      ...options
    });
  }
  toHTML() {
    return createTable();
  }
  prepare() {
    this.selection = new TableSelection();
  }
  onInput(event) {
    this.$emit('table:select', $(event.target).text())
  }
  init() {
    super.init();
    const $cell = this.$root.find(`[data-id="0:0"]`);
    this.selection.select($cell);
    this.$on('formula:input', (text) => {
      this.selection.current.text(text)
    })
    this.$on('formula:keydown', () => {
      this.selection.current.focus()
    })
  }
  onMousedown(event) {
    if (event.target.dataset.resize) {
      resizeHandler(this.$root, event);
    } else if (event.target.dataset.id) {
      const $target = $(event.target);
      this.$emit('table:select', $target.text())
      if (event.shiftKey) {
        let current = this.selection.current.id(true);
        let target = $target.id(true);
        let $cells = matrix(current, target).map((id) =>
          this.$root.find(`[data-id="${id}"]`)
        );
        this.selection.selectedGroup($cells);
      } else {
        this.selection.select($target);
      }
    }
  }
  onKeydown(event) {
    let keys = [
      "Tab",
      "Enter",
      "ArrowLeft",
      "ArrowRight",
      "ArrowUp",
      "ArrowDown",
    ];
    let {key} = event;
    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault()
      let target = this.selection.current.id(true);
      let next = nextCell(key, target);
      let $next = this.$root.find(`[data-id="${next.row}:${next.col}"]`)
      this.selection.select($next);
      this.$emit('table:select', $next.text())
    }
  }
}

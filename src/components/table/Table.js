import { ExcelComponent } from "../../core/ExcelComponent";
import { createTable } from "./table.template";
import { TableSelection } from "./TableSelection";
import { resizeHandler } from "./tableUtils";
import { $ } from "../../core/dom";
import { matrix, nextCell } from "./tableUtils";
import * as actions from "../../redux/actions";
import { defaultStyles } from "../../constants";
import { parseStr } from "../../core/parse";
export class Table extends ExcelComponent {
  static className = "excel__table";
  constructor($root, options) {
    super($root, {
      name: "Table",
      listeners: ["mousedown", "keydown", "input"],
      ...options,
    });
  }
  toHTML() {
    return createTable(100, this.store.getState());
  }
  prepare() {
    this.selection = new TableSelection();
  }
  updateTextInStore(value) {
    this.$disptch(
      actions.changeText({
        value,
        id: this.selection.current.id(),
      })
    );
  }
  onInput(event) {
    if ($(event.target).text()) {
      $(event.target).data.value = "";
    }
    this.updateTextInStore($(event.target).text());
  }
  init() {
    super.init();
    const $cell = this.$root.find(`[data-id="0:0"]`);
    this.selection.select($cell);
    this.$emit("table:select", $cell);
    this.$on("formula:input", (value) => {
      this.selection.current.attr("data-value", value);
      this.selection.current.text(parseStr(value));
      this.updateTextInStore(value);
    });
    this.$on("formula:keydown", () => {
      this.selection.current.focus();
    });
    this.$on("toolbar:applyStyle", (style) => {
      this.selection.applyStyle(style);
      this.$disptch(
        actions.applyStyle({
          value: style,
          ids: this.selection.group.map(($el) => $el.id()),
        })
      );
    });
  }
  async resizeCols(event) {
    try {
      const data = await resizeHandler(this.$root, event);
      this.$disptch(actions.tableResize(data));
    } catch (e) {
      console.log(e.message);
    }
  }

  onMousedown(event) {
    if (event.target.dataset.resize) {
      this.resizeCols(event);
    } else if (event.target.dataset.id) {
      const $target = $(event.target);
      // console.log("MouseDown", $target.data.value)
      // this.$emit("table:select", $target);
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

      this.updateTextInStore($target.data.value || $target.text()); // <<<<< ПОПРАВИТЬ БАГ
      let styles = $target.getStyles(Object.keys(defaultStyles));
      this.$disptch(actions.changeStyles(styles));
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
    let { key } = event;
    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault();
      let target = this.selection.current.id(true);
      let next = nextCell(key, target);
      let $next = this.$root.find(`[data-id="${next.row}:${next.col}"]`);
      this.selection.select($next);
      this.$emit("table:select", $next);
      this.updateTextInStore($next.text());
    }
  }
}

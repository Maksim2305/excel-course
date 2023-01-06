import { ExcelComponent } from "../../core/ExcelComponent";
import { $ } from "../../core/dom";
import { changeTitle } from "../../redux/actions";
import { defaultTitle } from "../../constants";
import { debounce } from "../../core/utils";
import { dom } from "../../core/dom"
import { ActiveRoute } from "../../routes/ActiveRoute";

export class Header extends ExcelComponent {
  static className = "excel__header";
  constructor($root, options) {
    super($root, {
      name: "Header",
      listeners: ["input", "click"],
      subscribers: ["currentTitle"],
      ...options,
    });
  }

  prepare() {
    this.onInput = debounce(this.onInput, 300);
  }
  toHTML() {
    return `
    <input type="text" class="input" value="${
      this.store.getState().currentTitle || defaultTitle
    }" />

      <div>

        <div class="button" data-type="remove">
          <i class="material-icons" data-type="remove">delete</i>
        </div>

        <div class="button" data-type="exit">
          <i class="material-icons" data-type="exit">exit_to_app</i>
        </div>

      </div>
    `;
  }

  onInput(event) {
    this.$disptch(changeTitle(event.target.value));
  }
  onClick(event) {
    const $target = $(event.target)
    if ($target.data.type === "remove") {
      const result = confirm(`Удалить таблицу ${this.store.getState().currentTitle || defaultTitle}?`)
      if (result) {
        localStorage.removeItem(ActiveRoute.path.replace("/", ":"))
        ActiveRoute.navigate("")
      }
    } else if ($target.data.type === "exit") {
      ActiveRoute.navigate("")
    }
  }
}

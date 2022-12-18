import { ExcelComponent } from "../../core/ExcelComponent";
import { $ } from "../../core/dom";
export class Formula extends ExcelComponent {
  static className = "excel__formula";

  constructor($root, options) {
    super($root, {
      name: "Formula",
      listeners: ["input", "keydown"],
      subscribers: ["currentText", "formulaText"],
      ...options,
    });
  }

  toHTML() {
    return `
    <div class="info">fx</div>
      <div class="input" id="formula-input" contenteditable spellcheck="false"></div>
    `;
  }

  init() {
    super.init();
    this.$formula = this.$root.find("#formula-input")
    this.$on('table:select', ($cell) => {
      this.$formula.text($cell.data.value)
    })
  }

  storeChanged({ currentText }) {
    this.$formula.text(currentText)
  }

  onInput(event) {
    let text = event.target.textContent;
    this.$emit("formula:input", $(event.target).text());
  }
  onKeydown(event) {
    if (event.key === "Enter" || event.key === "Tab") {
      event.preventDefault();
      this.$emit("formula:keydown");
    }
  }
}

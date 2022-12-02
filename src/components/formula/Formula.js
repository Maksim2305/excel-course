import { ExcelComponent } from "../../core/ExcelComponent";
import { $ } from '../../core/dom'
export class Formula extends ExcelComponent {
  static className = "excel__formula";

  constructor($root, options) {
    console.log(options);
    super($root, {
      name: "Formula",
      listeners: ["input", "keydown"],
      ...options,
    });
  }

  init() {
    super.init();
    this.$on('table:select', (text) => {
      document.getElementById('formula-input').textContent = text;
    })
  }

  toHTML() {
    return `
    <div class="info">fx</div>
      <div class="input" id="formula-input" contenteditable spellcheck="false"></div>
    `;
  }

  onInput(event) {
    let text = event.target.textContent;
    this.$emit("formula:input", text);
  }
  onKeydown(event) {
    if (event.key === "Enter" || event.key === "Tab" ) {
      event.preventDefault();
      this.$emit("formula:keydown");
    }
  }
}

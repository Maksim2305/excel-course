import { defaultStyles } from "../../constants";
import { parseStr } from "../../core/parse";
import { toInlineStyle } from "../../core/utils"
const CODES = {
  // коды букв
  A: 65,
  Z: 90,
};

const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 24;

function createRow(i, content, height) {
  const resize = i ? `<div class="row-resize" data-resize="row"></div>` : "";
  return `
    <div class="row" data-type="resizable" data-row="${i}" style=height:${height}>
        <div class="row-info">
        ${i}
        ${resize}
        </div>
        <div class="row-data" data-type="resizable-cols">
          ${content}
        </div>
      </div>
    `;
}

function getWidth(state = {}, index) {
  return (state[index] || DEFAULT_WIDTH) + "px";
}

function getHeight(state = {}, index) {
  return (state[index] || DEFAULT_HEIGHT) + "px";
}

function toColunm(cols, index, width) {
  // создаем атрибут по индексу, чтобы сравнивать колонку с яйчекой
  return `<div class="column" data-type="resizable" data-col=${index} style=width:${width}> 
    ${cols}
    <div class="col-resize" data-resize="col"></div>
  </div>`;
}

function createCell(row, col, state) {
  const id = `${row}:${col}`
  const width = `${getWidth(state.colState, col)}`
  const styles = toInlineStyle({
    ...defaultStyles,
    ...state.stylesState[id]
  })
  return `<div class="cell" contenteditable data-col="${col}"
  data-id="${id}"
  data-value="${state.dataState[id] || ""}"
  style=${styles};width:${width}>
    ${parseStr(state.dataState[id])|| ""}
  </div>`;
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}

// Функция создания строк и столбцов
export function createTable(countRows = 100, state = {}) {
  const countCols = CODES.Z - CODES.A + 1;
  const rows = [];
  // создаем строку с заголовками A - Z
  const cols = new Array(countCols)
    .fill("")
    .map(toChar)
    .map((cols, index) => {
      let width = getWidth(state.colState, index);
      return toColunm(cols, index, width);
    })
    .join("");
  rows.push(createRow("", cols, state));
  // создаем ячейки
  for (let row = 0; row < countRows; row++) {
    const cell = new Array(countCols)
      .fill("")
      .map((_, col) => {
        return createCell(row, col, state);
      })
      .join("");
      let height = getHeight(state.rowState, row+1)
    rows.push(createRow(row + 1, cell, height));
  }
  // приводим все к строке
  return rows.join("");
}

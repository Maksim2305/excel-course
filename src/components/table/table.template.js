const CODES = {
  // коды букв
  A: 65,
  Z: 90,
};

function createRow(i, content) {
  const resize = i ? `<div class="row-resize" data-resize="row"></div>` : "";
  return `
    <div class="row" data-type="resizable">
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

function toColunm(cols, index) {
  // создаем атрибут по индексу, чтобы сравнивать колонку с яйчекой
  return `<div class="column" data-type="resizable" data-col=${index}> 
    ${cols}
    <div class="col-resize" data-resize="col"></div>
  </div>`;
}

function createCell(it, index) {
  return `<div class="cell" contenteditable data-col="${index}"></div>`;
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}

// Функция создания строк и столбцов
export function createTable(countRows = 20) {
  const countCols = CODES.Z - CODES.A + 1;
  const rows = [];
  // создаем строку с заголовками A - Z
  const cols = new Array(countCols).fill("").map(toChar).map(toColunm).join("");
  rows.push(createRow("", cols));
  // создаем ячейки
  for (let i = 0; i < countRows; i++) {
    const cell = new Array(countCols)
      .fill("")
      .map((it, index) => createCell(it, index))
      .join("");
    rows.push(createRow(i + 1, cell));
  }
  // приводим все к строке
  return rows.join("");
}

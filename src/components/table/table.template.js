const CODES = {
  A: 65,
  Z: 90,
};

function createRow(i, content) {
  return `
    <div class="row">
        <div class="row-info">${i}</div>
        <div class="row-data">${content}</div>
      </div>
    `;
}

function toColunm(cols) {
  return `<div class="column">${cols}</div>`;
}


function createCell() {
  return `<div class="cell" contenteditable></div>`;
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}

export function createTable(countRows = 20) {
  const countCols = CODES.Z - CODES.A + 1;
  const rows = [];

  const cols = new Array(countCols).fill("").map(toChar).map(toColunm).join("");
  rows.push(createRow("", cols));

  for (let i = 0; i < countRows; i++) {
    const cell = new Array(countCols)
      .fill("")
      .map((it) => createCell(it))
      .join("");
    console.log(cell);
    rows.push(createRow(i + 1, cell));
  }
  return rows.join("");
}

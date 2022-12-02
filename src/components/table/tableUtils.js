import { $ } from "../../core/dom";
import { range } from "../../core/utils";
export function resizeHandler(root, event) {
  const $target = $(event.target);
  const $parent = $target.closest("[data-type=resizable]");
  const type = event.target.dataset.resize;
  let styleProp = type === "col" ? "bottom" : "right";
  let value = "";
  $target.css({
    opacity: 1,
    [styleProp]: "-5000px",
  });
  const coords = $parent.getCoords();
  const cells = root.findAll(`[data-col="${$parent.data.col}"]`);
  document.onmousemove = (e) => {
    // поиск по массиву эксель таблицы
    if (type === "col") {
      const deltaX = e.pageX - coords.right;
      value = coords.width + deltaX;
      $target.css({
        right: -value + coords.width + "px",
      });
    } else {
      const deltaY = e.pageY - coords.bottom;
      value = coords.height + deltaY;
      $target.css({
        bottom: coords.height - value + "px",
      });
    }
  };
  document.onmouseup = (el) => {
    document.onmousemove = null;
    document.onmouseup = null;
    if (type === "col") {
      $parent.css({ width: value + "px" });
      cells.forEach((el) => {
        el.style.width = value + "px";
      });
      $target.css({
        right: 0 + "px",
        opacity: 0,
      });
    } else {
      $parent.css({ height: value + "px" });
      $target.css({
        bottom: 0 + "px",
        opacity: 0,
      });
    }
  };
}

export function matrix(current, target) {
  let cols = range(current.col, target.col);
  let rows = range(current.row, target.row);
  return cols.reduce((acc, col) => {
    rows.forEach((row) => acc.push(`${row}:${col}`));
    return acc;
  }, []);
}


export function nextCell(key, { row, col }) {
  const MIN_VALUE = 0;
  switch (key) {
    case "Tab":
    case "ArrowRight":
      col++
      break;
    case "Enter":
    case "ArrowDown":
      row++
      break;
    case "ArrowUp":
      row === MIN_VALUE ? MIN_VALUE : row--
      break;
    case "ArrowLeft":
      col === MIN_VALUE ? MIN_VALUE : col--
      break;
  }
  return {row, col}
}


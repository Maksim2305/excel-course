import { storage } from "../core/utils";
import { ActiveRoute } from '../routes/ActiveRoute'

function toHTML(key) {
const title = (storage(key).currentTitle)
const id = key.split(':')[1]
const date = (new Date(storage(key).createDate).toLocaleDateString())
  return `
    <li class="db__record">
        <a href="#excel/${id}">${title}</a>
        <strong>
        ${new Date(storage(key).createDate).toLocaleDateString()}
        ${new Date(storage(key).createDate).toLocaleTimeString()}
        </strong>
    </li>
    `;
}

function getKeys() {
  let keys = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key.includes("excel")) {
      continue;
    }
    keys.push(localStorage.key(i));
  }
  return keys;
}

export function getList() {
  let keys = getKeys();
  if (!keys.length) {
    return `<p>Нет записей!</p>`;
  } else {
    return `
    <div class="db__list-header">
    <span>Название</span>
    <span>Дата открытия</span>
    </div>

    <ul class="db__list">
        ${keys.map(toHTML).join("")}
    </ul>
    `;
  }
}

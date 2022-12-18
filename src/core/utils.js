export function method(string) {
  if (typeof string !== "string") {
    return "";
  }
  return string.charAt(0).toLocaleUpperCase() + string.slice(1);
}

export function range(start, end) {
  if (start > end) {
    [end, start] = [start, end];
  }
  return new Array(end - start + 1).fill("").map((_, index) => start + index);
}

export function storage(key, data) {
  if (!data) {
    return JSON.parse(localStorage.getItem(key));
  } else {
    localStorage.setItem(key, JSON.stringify(data));
  }
}

export function isEqual(prev, state) {
  if (typeof prev === "object" && typeof state === "object") {
    return JSON.stringify(prev) === JSON.stringify(state);
  }
  return prev === state;
}

export function camelToDash(str) {
  return str.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`);
}

export function toInlineStyle(styles = {}) {
  return Object.keys(styles)
    .map((key) => `${camelToDash(key)}:${styles[key]}`)
    .join(";");
}

export function debounce(fn, wait) {
  let timeout;
  return function(...args) {
    const later = () => {
      clearTimeout(timeout);
      // eslint-disable-next-line
      fn.apply(this, args)
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

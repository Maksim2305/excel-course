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


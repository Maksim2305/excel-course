export function method(string) {
  if (typeof string !== "string") {
    return "";
  }
  return string.charAt(0).toLocaleUpperCase() + string.slice(1);
}

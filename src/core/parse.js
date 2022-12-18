export function parseStr(value = "") {
  try {
    if (value.startsWith("=")) {
      console.log(value.slice(1))
      return eval(value.slice(1));
    }
  } catch {
    return value;
  }
  return value;
}

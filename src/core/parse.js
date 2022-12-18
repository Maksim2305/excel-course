export function parseStr(value = "") {
  try {
    if (value.startsWith("=")) {
      return eval(value.slice(1));
    }
  } catch {
    return value;
  }
  return value;
}

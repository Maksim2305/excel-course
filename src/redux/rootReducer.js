import { toInlineStyle } from "../core/utils";
import { CHANGE_STYLE, TABLE_RESIZE, CHANGE_TEXT, APPLY_STYLE, CHANGE_TITLE } from "./types";

export function rootReducer(state, action) {
  let field;
  let prevState;
  let val;
  switch (action.type) {
    case TABLE_RESIZE:
      field = action.data.type === "col" ? "colState" : "rowState";
      prevState = state[field] || {};
      prevState[action.data.id] = action.data.value;
      return { ...state, [field]: prevState };
    case CHANGE_TEXT:
      prevState = state["dataState"] || {};
      prevState[action.data.id] = action.data.value;
      return { ...state, currentText: action.data.value, dataState: prevState };
    case CHANGE_STYLE:
      return { ...state, currentStyles: action.data };
    case APPLY_STYLE:
      field = "stylesState";
      val = state[field] || {};
      action.data.ids.forEach((id) => {
        val[id] = { ...val[id], ...action.data.value };
      });
      return {
        ...state,
        [field]: val,
        currentStyles: { ...state.currentStyles, ...action.data.value },
      };
    case CHANGE_TITLE:
      return { ...state, currentTitle: action.data };
    default:
      return state;
  }
}

import { copy, storage } from "../core/utils";
import { defaultStyles, defaultTitle } from "../constants";
const defaultState = {
  rowState: {},
  colState: {},
  currentText: "",
  currentTitle: defaultTitle,
  dataState: {},
  stylesState: {},
  currentStyles: defaultStyles,
  formulaText: "",
  createDate: new Date().toJSON(),
};

const normalize = (state) => ({
  ...state,
  currentStyles: defaultStyles,
  currentText: "",
});

export function normalizeInitialState(state) {
  return state ? normalize(state) : copy(defaultState);
}

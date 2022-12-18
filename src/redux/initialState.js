import { storage } from "../core/utils";
import { defaultStyles, defaultTitle } from "../constants";
const defaultState = {
    rowState: {},
    colState: {},
    currentText: "",
    currentTitle: defaultTitle,
    dataState: {},
    stylesState: {},
    currentStyles: defaultStyles,
    formulaText: ""
}

const normalize = (state) => ({
    ...state,
    currentStyles: defaultStyles,
    currentText: ""
})

export const initialState = storage('excel-state') ?
 normalize(storage('excel-state'))
 : defaultState
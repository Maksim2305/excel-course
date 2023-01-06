import { Page } from "../routes/Page";
import { CreateStore } from "../core/CreateStore";
import { rootReducer } from "../redux/rootReducer";
import { initialState } from "../redux/initialState";
import { debounce } from "../core/utils";
import { storage } from "../core/utils";
import { Excel } from "../components/excel/Excel";
import { Header } from "../components/header/Header";
import { Toolbar } from "../components/toolbar/Toolbar";
import { Formula } from "../components/formula/Formula";
import { Table } from "../components/table/Table";
import { normalizeInitialState } from "../redux/initialState";

function storageName(state) {
  return "excel:" + state;
}

export class ExcelPage extends Page {
  getRoot() {
    const param = this.params ? this.params : Date.now().toString();

    const state = storage(storageName(param))
    const store = new CreateStore(rootReducer, normalizeInitialState(state));

    const stateListener = debounce((state) => {
      storage(storageName(param), state);
    }, 300);

    store.subscribe(stateListener);

    this.excel = new Excel({
      components: [Header, Toolbar, Formula, Table],
      store,
    });
    return this.excel.getRoot();
  }
  afterRender() {
    this.excel.init();
  }
  destroy() {
    this.excel.destoy();
  }
}

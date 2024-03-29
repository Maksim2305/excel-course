import { $ } from "../core/dom";
import { ActiveRoute } from "./ActiveRoute";
import { Page } from "./Page";

export class Router {
  constructor(selector, routes) {
    if (!selector) {
      throw new Error("selector is not provided!");
    }
    this.routes = routes;
    this.$placeholder = $(selector);
    this.page = null;
    this.changePageHandler = this.changePageHandler.bind(this);
    this.init();
  }

  init() {
    window.addEventListener("hashchange", this.changePageHandler);
    this.changePageHandler();
  }

  changePageHandler(event) {
    if (this.page) {
      this.page.destroy();
    }
    this.$placeholder.clear();
    const Page = ActiveRoute.path.includes("excel")
      ? this.routes.excel
      : this.routes.dashboard;
    this.page = new Page(ActiveRoute.param);
    this.$placeholder.append(this.page.getRoot());
    this.page.afterRender();
  }

  destroy() {
    window.removeEventListener("hashchange", this.changePageHandler);
  }
}

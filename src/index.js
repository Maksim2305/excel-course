import { DashboardPage } from "./pages/DashboardPage";
import { ExcelPage } from "./pages/ExcelPage";
import { Router } from "./routes/Router";
import "./scss/index.scss";
new Router("#app", {
  dashboard: DashboardPage,
  excel: ExcelPage
})
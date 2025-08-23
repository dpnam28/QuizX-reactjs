import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import Layout from "./Layout.jsx";
import { Provider } from "react-redux";
import reduxStore from "./redux/store.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={reduxStore}>
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  </Provider>
);

import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import Layout from "./Layout.jsx";
import { Provider } from "react-redux";
import { reduxStore, persistor } from "./redux/store.jsx";
import "nprogress/nprogress.css";
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")).render(
  <Provider store={reduxStore}>
    <BrowserRouter>
      <PersistGate loading={null} persistor={persistor}>
        <Layout />
      </PersistGate>
    </BrowserRouter>
  </Provider>
);

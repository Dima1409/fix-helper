import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import "./index.css";
import App from "App/App";
import { HashRouter } from "react-router-dom";
import ButtonTop from "components/ButtonTop";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <HashRouter>
          <ButtonTop />
          <App />
        </HashRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

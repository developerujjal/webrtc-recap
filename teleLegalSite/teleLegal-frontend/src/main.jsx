import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./reduxStuff/reducers/RootReducer.js";

const store = createStore(rootReducer);
createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  //  </StrictMode>,
);

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { store, persistor } from "./redux/store.js";
import App from "./App.jsx";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate persistor={persistor} loading={null}>
      <StrictMode>
        <App />
      </StrictMode>
    </PersistGate>
  </Provider>
);

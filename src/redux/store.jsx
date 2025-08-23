import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducer/rootReducer";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";

const reduxStore = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default reduxStore;

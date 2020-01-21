import { createStore } from "redux";
import { devToolsEnhancer } from "redux-devtools-extension";

import todos from "./reducers/index";

const store = createStore(todos, devToolsEnhancer({ name: "name" }));

export default store;

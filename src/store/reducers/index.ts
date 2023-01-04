import counter from "./counter";
import user from "./user";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
  counter,
  user,
});

export default rootReducer;

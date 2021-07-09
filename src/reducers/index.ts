import { combineReducers } from "redux";
import userReducer from "./Users";
import tagReducer from "./Tags";
import serverReducer from "./Server";

const reducers = {
  server: serverReducer,
  users: userReducer,
  tags: tagReducer
};

const RootReducer = combineReducers(reducers);

export type TRootState = ReturnType<typeof RootReducer>;

export default RootReducer;

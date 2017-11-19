import { combineReducers } from "redux";
import paragraphReducer from "./paragraphReducer";

const rootReducer = combineReducers({
  paragraphs: paragraphReducer
});
export default rootReducer;

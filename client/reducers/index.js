import { combineReducers } from "redux";
import articleReducer from "./articleReducer";
import suggestionReducer from "./suggestionReducer";

const rootReducer = combineReducers({
  article: articleReducer,
  suggestionGroup: suggestionReducer
});
export default rootReducer;

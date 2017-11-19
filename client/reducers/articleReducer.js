import { ADD_ARTICLE } from "../actions/types";

const initialState = {
  title: null,
  paragraphs: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_ARTICLE:
      return action.payload;
    default:
      return state;
  }
};

import { ADD_PARAGRAPHS } from "../actions/types";

const initialState = {
  title: null,
  data: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_PARAGRAPHS:
      return action.payload;
    default:
      return state;
  }
};

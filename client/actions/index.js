import axios from "axios";

import ADD_PARAGRAPHS from "./types";

export const addParagraphs = par => {
  return {
    type: ADD_PARAGRAPHS,
    payload: par
  };
};

export const fetchParagraphs = url => {
  return dispatch => {
    axios
      .get(`http://localhost:3000/${url}`)
      .then(res => {
        dispatch(addParagraphs(res.data));
      })
      .catch(e => {
        console.log("Error occured: ", e);
      });
  };
};

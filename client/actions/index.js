/* eslint-disable */
import axios from "axios";

import { ADD_ARTICLE } from "./types";

export const addArticle = par => {
  return {
    type: ADD_ARTICLE,
    payload: par
  };
};

export const fetchArticle = url => {
  return dispatch => {
    axios
      .get(`http://localhost:3000/api/fb?articleURL=${url}`)
      .then(res => {
        dispatch(addArticle(res.data));
      })
      .catch(e => {
        console.log("Error occured: ", e);
      });
  };
};

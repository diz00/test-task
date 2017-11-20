import axios from "axios";

import {
  ADD_ARTICLE,
  ADD_SUGGESTIONS,
  SUGGESTION_APPROVED,
  SUGGESTION_DELETED,
  OWN_SUGGESTION_APPROVED
} from "./types";

const baseURL = "http://localhost:3000";

export const addArticle = par => {
  return {
    type: ADD_ARTICLE,
    payload: par
  };
};

export const fetchArticle = url => {
  return dispatch => {
    axios
      .get(`${baseURL}/api/fb`, {
        params: {
          articleURL: url
        }
      })
      .then(res => {
        dispatch(addArticle(res.data));
      })
      .catch(e => {
        console.log("Error occured: ", e);
      });
  };
};

export const suggestChanges = changes => {
  return () => {
    axios
      .post(`${baseURL}/api/suggest`, changes)
      .then(() => alert("Successfully suggested changes"))
      .catch(e => console.log("Error occured: ", e));
  };
};

export const addSuggestion = suggestions => {
  return {
    type: ADD_SUGGESTIONS,
    payload: suggestions
  };
};

export const fetchSuggestions = () => {
  return dispatch => {
    axios
      .get(`${baseURL}/api/suggest`)
      .then(res => {
        dispatch(addSuggestion(res.data));
      })
      .catch(e => {
        console.log("Error occured: ", e);
      });
  };
};

export const suggestionApproved = (suggestionId, originalText) => {
  return {
    type: SUGGESTION_APPROVED,
    payload: { suggestionId, originalText }
  };
};

export const approveSuggestion = (suggestionId, originalText) => {
  return dispatch => {
    axios
      .post(`${baseURL}/api/suggest/approve`, { suggestionId, originalText })
      .then(() => {
        dispatch(suggestionApproved(suggestionId, originalText));
      })
      .catch(e => {
        console.log("Error occured: ", e);
      });
  };
};

export const suggestionDeleted = originalText => {
  return {
    type: SUGGESTION_DELETED,
    payload: { originalText }
  };
};

export const deleteSuggestion = originalText => {
  return dispatch => {
    axios
      .delete(`${baseURL}/api/suggest`, {
        data: {
          originalText
        }
      })
      .then(() => {
        dispatch(suggestionDeleted(originalText));
      })
      .catch(e => {
        console.log("Error occured: ", e);
      });
  };
};

export const ownSuggestionApproved = ownSuggestion => {
  return {
    type: OWN_SUGGESTION_APPROVED,
    payload: { ownSuggestion }
  };
};

export const approveOwnSuggestion = (
  ownSuggestion,
  { originalText, articleUrl }
) => {
  return dispatch => {
    axios
      .post(`${baseURL}/api/suggest/approve-own`, {
        originalText,
        usersText: ownSuggestion,
        articleUrl
      })
      .then(res => {
        dispatch(ownSuggestionApproved(res.data));
      })
      .catch(e => {
        console.log("Error occured: ", e);
      });
  };
};

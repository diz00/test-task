import _ from "lodash";
import {
  ADD_SUGGESTIONS,
  SUGGESTION_APPROVED,
  SUGGESTION_DELETED,
  OWN_SUGGESTION_APPROVED
} from "../actions/types";

function suggestionApproved(state, action) {
  const { suggestionId, originalText } = action.payload;
  const suggestionGroupIndex = _.findIndex(state, suggestion => {
    return suggestion._id === originalText;
  });

  const suggestionItem = state[suggestionGroupIndex];

  const approvedSuggestion = {
    _id: suggestionItem._id,
    suggestions: _.map(suggestionItem.suggestions, suggestion => {
      return {
        ...suggestion,
        isApproved: suggestion._id === suggestionId
      };
    })
  };

  const firstHalf = state.slice(0, suggestionGroupIndex);
  const lastHalf = state.slice(suggestionGroupIndex + 1, state.length);
  return [...firstHalf, approvedSuggestion, ...lastHalf];
}

function suggestionDeleted(state, action) {
  const deletedSuggestionIndex = _.findIndex(state, suggestion => {
    return suggestion._id === action.payload.originalText;
  });

  const firstPart = state.slice(0, deletedSuggestionIndex);
  const lastPart = state.slice(deletedSuggestionIndex + 1, state.length);

  return [...firstPart, ...lastPart];
}

function ownSuggestionApproved(state, action) {
  const suggestionGroupIndex = _.findIndex(state, suggestion => {
    return suggestion._id === action.payload.ownSuggestion.originalText;
  });

  const newSuggestionGroup = {
    ...state[suggestionGroupIndex],
    suggestions: [
      ..._.map(state[suggestionGroupIndex].suggestions, suggestion => {
        return { ...suggestion, isApproved: false };
      }),
      action.payload.ownSuggestion
    ]
  };

  const firstPart = state.slice(0, suggestionGroupIndex);
  const lastPart = state.slice(suggestionGroupIndex + 1, state.length);

  return [...firstPart, newSuggestionGroup, ...lastPart];
}

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_SUGGESTIONS:
      return action.payload;

    case SUGGESTION_APPROVED:
      return suggestionApproved(state, action);

    case SUGGESTION_DELETED:
      return suggestionDeleted(state, action);

    case OWN_SUGGESTION_APPROVED:
      return ownSuggestionApproved(state, action);
    default:
      return state;
  }
};

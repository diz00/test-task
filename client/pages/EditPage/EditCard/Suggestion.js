import React from "react";
import PropTypes from "prop-types";

import "./Suggestion.css";

function Suggestion(props) {
  return (
    <div className="suggestion-container">
      <div className="suggestion-text">{props.text}</div>
      <div className="suggestion-btn-container">
        {props.isApproved ? (
          <p className="approved-label">Approved</p>
        ) : (
          <button className="approve-btn" onClick={props.handleApprove}>
            APPROVE
          </button>
        )}
      </div>
    </div>
  );
}

Suggestion.propTypes = {
  text: PropTypes.string.isRequired,
  isApproved: PropTypes.bool.isRequired,
  handleApprove: PropTypes.func.isRequired
};

export default Suggestion;

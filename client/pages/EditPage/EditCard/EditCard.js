import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
  approveSuggestion,
  deleteSuggestion,
  approveOwnSuggestion
} from "../../../actions";

import Suggestion from "./Suggestion";

import "./EditCard.css";

class EditCard extends Component {
  state = {
    ownSuggestion: ""
  };

  handleApprove = suggestionId => {
    this.props.approveSuggestion(suggestionId, this.props._id);
  };

  handleDelete = () => {
    this.props.deleteSuggestion(this.props._id);
  };

  handleOwnSuggestionApprove = () => {
    if (
      !this.state.ownSuggestion ||
      this.state.ownSuggestion === this.props._id
    ) {
      return alert("Make a proper suggestion");
    }

    return this.props.approveOwnSuggestion(this.state.ownSuggestion, {
      originalText: this.props._id,
      articleUrl: this.props.suggestions[0].articleUrl
    });
  };

  render() {
    return (
      <div className="card">
        <div className="card-content">
          <div className="card-header">
            <h2 className="card-label">Original text</h2>
            <button onClick={this.handleDelete} className="delete-btn">
              DELETE
            </button>
          </div>
          <h3 className="card-text">{this.props._id}</h3>
          <h2 className="card-label">User suggestions:</h2>
          {this.props.suggestions.map(suggestion => (
            <Suggestion
              key={suggestion._id}
              text={suggestion.usersText}
              isApproved={suggestion.isApproved}
              handleApprove={() => this.handleApprove(suggestion._id)}
            />
          ))}
          <div className="suggestion-input-container">
            <div className="user-suggestion-input-container">
              <input
                value={this.state.ownSuggestion}
                onChange={e => this.setState({ ownSuggestion: e.target.value })}
                className="user-suggestion-input"
                type="text"
              />
            </div>
            <div className="approve-btn-container">
              <button
                onClick={this.handleOwnSuggestionApprove}
                className="approve-btn"
              >
                APPROVE
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EditCard.propTypes = {
  _id: PropTypes.string.isRequired,
  suggestions: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      usersText: PropTypes.string.isRequired,
      articleUrl: PropTypes.string.isRequired,
      originalText: PropTypes.string.isRequired,
      isApproved: PropTypes.bool.isRequired
    })
  ).isRequired,
  approveSuggestion: PropTypes.func.isRequired,
  deleteSuggestion: PropTypes.func.isRequired,
  approveOwnSuggestion: PropTypes.func.isRequired
};

export default connect(null, {
  approveSuggestion,
  deleteSuggestion,
  approveOwnSuggestion
})(EditCard);

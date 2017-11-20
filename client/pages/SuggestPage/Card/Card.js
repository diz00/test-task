import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { suggestChanges } from "../../../actions";

import "./Card.css";

class Card extends Component {
  state = {
    usersVersion: ""
  };
  sendChanges = () => {
    if (
      !this.state.usersVersion ||
      this.state.usersVersion === this.props.paragraph
    ) {
      return alert("Please type something to suggest changes");
    }

    const changes = {
      articleUrl: this.props.articleURL,
      originalText: this.props.paragraph,
      usersText: this.state.usersVersion
    };
    this.props.suggestChanges(changes);
    return this.setState({ usersVersion: "" });
  };
  render() {
    return (
      <div className="card">
        <div className="card-content">
          <h2 className="card-label">ORIGINAL TEXT</h2>
          <h3 className="card-text">{this.props.paragraph}</h3>
          <h2 className="card-label">USERS VERSION</h2>
          <textarea
            className="user-input"
            value={this.state.usersVersion}
            onChange={e => this.setState({ usersVersion: e.target.value })}
            rows="4"
          />
        </div>
        <button onClick={this.sendChanges} className="send-changes-btn">
          <span className="icon">✓</span> SEND CHANGES
        </button>
      </div>
    );
  }
}

Card.propTypes = {
  articleURL: PropTypes.string.isRequired,
  paragraph: PropTypes.string.isRequired,
  suggestChanges: PropTypes.func.isRequired
};

export default connect(null, { suggestChanges })(Card);

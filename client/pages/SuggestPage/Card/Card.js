import React, { Component } from "react";
import PropTypes from "prop-types";

import "./Card.css";

class Card extends Component {
  state = {
    usersVersion: ""
  };
  sendChanges = () => {
    // use action
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
        <button className="send-changes-btn">
          <span className="icon">✓</span> SEND CHANGES
        </button>
      </div>
    );
  }
}

Card.propTypes = {
  paragraph: PropTypes.string.isRequired
};

export default Card;

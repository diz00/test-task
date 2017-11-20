import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import "./WelcomePage.css";

class WelcomePage extends Component {
  state = {
    url: ""
  };

  fetchArticle = () => {
    if (!this.state.url) {
      return;
    }

    this.props.history.push({
      pathname: "/fb",
      search: `?articleURL=${this.state.url}`
    });
  };

  render() {
    return (
      <div>
        <h2>Enter a link to the article</h2>
        <input
          className="link-input"
          type="text"
          value={this.state.url}
          onChange={e => this.setState({ url: e.target.value })}
        />
        <button className="btn-fetch" onClick={this.fetchArticle}>
          Fetch article to edit
        </button>
        <Link to="/fb/results" className="btn-navigate">
          Go to Edit Page
        </Link>
      </div>
    );
  }
}

WelcomePage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

export default WelcomePage;

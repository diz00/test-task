/* eslint-disable */
import React, { Component } from "react";
import PropTypes from "prop-types";
import qs from "query-string";

class SuggestPage extends Component {
  componentDidMount() {
    let parsed = qs.parse(this.props.location.search);
    if (parsed.articleURL) {
      // do something
    }
  }
  render() {
    return <div>suggest page!</div>;
  }
}

SuggestPage.propTypes = {
  location: PropTypes.shape({
    articleURL: PropTypes.string
  }).isRequired
};

export default SuggestPage;

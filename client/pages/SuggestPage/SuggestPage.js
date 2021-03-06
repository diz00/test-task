import React, { Component } from "react";
import PropTypes from "prop-types";
import qs from "query-string";
import { connect } from "react-redux";
import uuidv4 from "uuid/v4"; // needed to generate unique keys for paragraphs, since they don't have a unique id

import { fetchArticle } from "../../actions";
import Card from "./Card/Card";

class SuggestPage extends Component {
  state = {
    articleURL: qs.parse(this.props.location.search).articleURL
  };

  componentDidMount() {
    if (!this.state.articleURL) {
      return;
    }
    this.props.fetchArticle(this.state.articleURL);
  }
  render() {
    return (
      <div>
        <h1>{this.props.title}</h1>
        {this.props.paragraphs.map(p => (
          <Card
            key={uuidv4()}
            paragraph={p}
            articleURL={this.state.articleURL}
          />
        ))}
      </div>
    );
  }
}

SuggestPage.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string
  }).isRequired,
  fetchArticle: PropTypes.func.isRequired,
  paragraphs: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string
};

SuggestPage.defaultProps = {
  paragraphs: [],
  title: ""
};

function mapStateToProps({ article }) {
  return { paragraphs: article.paragraphs, title: article.title };
}

export default connect(mapStateToProps, { fetchArticle })(SuggestPage);

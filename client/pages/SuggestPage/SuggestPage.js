/* eslint-disable */
import React, { Component } from "react";
import PropTypes from "prop-types";
import qs from "query-string";
import { connect } from "react-redux";

import { fetchParagraphs } from "../../actions";
import Card from "./Card/Card";

const dummyData = [
  "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Obcaecati magni exercitationem vel dicta id nostrum quasi laborum doloremque perferendis aliquid nobis, voluptatem aliquam sint ipsam ipsum voluptate recusandae molestiae et!",
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora accusamus cumque debitis animi nostrum dolorem aliquam quidem? Corrupti doloremque a, hic incidunt nulla voluptatum veniam repellat odit accusamus dolorum distinctio.",
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero quod nesciunt maiores dicta iusto velit! Dolorum maxime, beatae labore libero deserunt unde facere ratione? Nemo velit architecto omnis nam rem."
];

class SuggestPage extends Component {
  componentDidMount() {
    const parsed = qs.parse(this.props.location.search);
    if (!parsed.articleURL) {
      return;
    }
    this.props.fetchParagraphs(parsed.articleURL);
  }
  render() {
    return <div>{dummyData.map(p => <Card paragraph={p} />)}</div>;
  }
  // render() {
  //   return <div>{this.props.paragraphs.map(p => <Card {...p} />)}</div>;
  // }
}

SuggestPage.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string
  }).isRequired,
  fetchParagraphs: PropTypes.func.isRequired,
  paragraphs: PropTypes.arrayOf(PropTypes.string)
};

SuggestPage.defaultProps = {
  paragraphs: []
};

function mapStateToProps({ paragraphs }) {
  return { paragraphs: paragraphs.data };
}

export default connect(mapStateToProps, { fetchParagraphs })(SuggestPage);

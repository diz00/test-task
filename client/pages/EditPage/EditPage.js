import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import _ from "lodash";
import uuidv4 from "uuid/v4";
import qs from "query-string";

import { fetchSuggestions } from "../../actions";
import EditCard from "./EditCard/EditCard";

class EditPage extends Component {
  state = {
    showApproved: qs.parse(this.props.location.search).showApproved
  };
  componentDidMount() {
    this.props.fetchSuggestions();
  }

  getApprovedSuggestions = suggestions => {
    return _.filter(suggestions, suggestion => {
      for (let i = 0; i < suggestion.suggestions.length; i += 1) {
        if (suggestion.suggestions[i].isApproved) {
          return true;
        }
      }
      return false;
    });
  };

  getUnapprovedSuggestions = suggestions => {
    return _.filter(suggestions, suggestion => {
      for (let i = 0; i < suggestion.suggestions.length; i += 1) {
        if (suggestion.suggestions[i].isApproved) {
          return false;
        }
      }
      return true;
    });
  };

  changeApproved = approved => {
    this.props.history.push({
      pathname: "/fb/results",
      search: `?showApproved=${approved}`
    });

    this.setState({
      showApproved: approved
    });
  };

  render() {
    let filteredSuggestions;
    let button;

    if (this.state.showApproved === "true") {
      filteredSuggestions = this.getApprovedSuggestions(
        this.props.suggestionGroup
      );
      button = (
        <button
          className="show-approve-btn"
          onClick={() => this.changeApproved("false")}
        >
          Show only NOT approved suggestions{" "}
        </button>
      );
    } else {
      filteredSuggestions = this.getUnapprovedSuggestions(
        this.props.suggestionGroup
      );
      button = (
        <button
          className="show-approve-btn"
          onClick={() => this.changeApproved("true")}
        >
          Show only approved suggestions
        </button>
      );
    }

    return (
      <div>
        <h1>This is a page where you can approve or delete suggestions</h1>
        {button}
        {filteredSuggestions.map(suggestion => (
          <EditCard key={uuidv4()} {...suggestion} />
        ))}
      </div>
    );
  }
}

EditPage.propTypes = {
  location: PropTypes.any,
  history: PropTypes.any.isRequired,
  fetchSuggestions: PropTypes.func.isRequired,
  suggestionGroup: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      suggestions: PropTypes.arrayOf(
        PropTypes.shape({
          _id: PropTypes.string.isRequired,
          usersText: PropTypes.string.isRequired,
          articleUrl: PropTypes.string.isRequired,
          originalText: PropTypes.string.isRequired,
          isApproved: PropTypes.bool.isRequired
        })
      ).isRequired
    })
  )
};

EditPage.defaultProps = {
  suggestionGroup: [],
  location: { search: "" }
};

function mapStateToProps({ suggestionGroup }) {
  return {
    suggestionGroup
  };
}

export default connect(mapStateToProps, { fetchSuggestions })(EditPage);

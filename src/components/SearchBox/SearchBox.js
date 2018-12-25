import React, { PureComponent } from "react";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import queryString from "query-string";

type Props = {
  router: Object
};

type State = {
  search: String
};

class SearchBox extends PureComponent<Props, State> {
  state = { search: "" };

  componentWillMount() {
    const { search } = this.props.location;
    this.setState({ search: queryString.parse(search).name || "" });
  }

  handleSubmit = event => {
    event.preventDefault();
    const { pathname, search } = this.props.location;
    const query = queryString.parse(search);
    if (this.state.search) {
      query.name = this.state.search;
    } else {
      delete query.name;
    }
    const string = queryString.stringify(query);
    console.log(string);
    this.props.history.push({
      pathname,
      search: string ? `?${string}` : ""
    });
  };

  handleChange = event => {
    this.setState({ search: event.target.value });
  };

  render() {
    const { search } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={this.handleChange}
        />
      </form>
    );
  }
}

export default compose(withRouter)(SearchBox);

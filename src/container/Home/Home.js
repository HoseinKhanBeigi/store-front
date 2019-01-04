/* @flow */

import React, { PureComponent } from "react";
import { compose } from "redux";
import { withRouter } from "react-router-dom";

type State = {
  data: Array<String>,
  onMous: Boolean
};

class Home extends PureComponent<State> {
  state = {
    data: "Home"
  };

  componentDidMount() {
    window.addEventListener("resize", () => {
      const width =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;
      if (width < 960) {
        console.log("hi");
      }
    });
  }

  render() {
    const { data } = this.state;

    return (
      <div>
        <h1>{data}</h1>
      </div>
    );
  }
}

export default compose(withRouter)(Home);

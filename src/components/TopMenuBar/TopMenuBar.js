/* @flow */

import React, { PureComponent } from "react";
import { hot } from "react-hot-loader";
import TopMenuBarMobile from "../mobileComponent/TopMenuBarMobile";
import TopMenuBarWeb from "../WebComponent/TopMenuBarWeb";

type State = {
  data: String
};

class TopMenuBar extends PureComponent<State> {
  state = {
    data: undefined
  };

  componentDidMount() {
    const initWidth = document.body.clientWidth;
    if (initWidth <= 970) {
      this.setState({ data: "MOBILE" });
    }
    if (initWidth > 970) {
      this.setState({ data: "WEB" });
    }
    window.addEventListener("resize", () => {
      const width = document.body.clientWidth;
      if (width <= 970) {
        this.setState({ data: "MOBILE" }, () => {
          this.setState({ data: "MOBILE" });
        });
      }
      if (width > 970) {
        this.setState({ data: "WEB" });
      }
    });
  }

  render() {
    const { data } = this.state;

    if (data === undefined) {
      return null;
    } else {
      return data === "WEB" ? <TopMenuBarWeb /> : <TopMenuBarMobile />;
    }
  }
}

export default hot(module)(TopMenuBar);

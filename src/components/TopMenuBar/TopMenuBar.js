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
    data: "WEB"
  };

  componentDidMount() {
    window.addEventListener("resize", () => {
      const width =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;
      if (width <= 970) {
        this.setState({ data: "MOBILE" });
      } else if (width > 970) {
        this.setState({ data: "WEB" });
      }
    });
  }

  render() {
    const { data } = this.state;

    console.log(data);

    return data === "WEB" ? <TopMenuBarWeb /> : <TopMenuBarMobile />;
  }
}

export default hot(module)(TopMenuBar);

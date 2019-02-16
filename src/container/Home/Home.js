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

  render() {
    const { data } = this.state;

    const symbol = (
      <polygon points="14.1333333 2.61666667 18.9333333 7.41666667 0 7.41666667 0 10.0833333 18.9333333 10.0833333 14.1333333 14.8833333 16 16.75 24 8.75 16 0.75" />
    );

    return (
      <div>
        <main>
          <div className="grid grid--layout-1">
            <div className="grid__item" />
            <div className="grid__item" />
            <div className="grid__item" />
            <div className="grid__item" />
            <div className="grid__item" />
            <div className="grid__item" />
            <div className="grid__item" />
            <div className="grid__item" />
            <div className="grid__item" />
            <div className="grid__item" />
            <div className="grid__item" />
            <div className="grid__item" />
            <div className="grid__item" />
            <div className="grid__item grid__item--nav grid__item--nav-prev">
              <svg className="icon icon--nav-arrow" viewBox="0 0 24 24">
                {symbol}
              </svg>
            </div>
            <div className="grid__item grid__item--nav grid__item--nav-next">
              <svg className="icon icon--nav-arrow" viewBox="0 0 24 24">
                {symbol}
              </svg>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default compose(withRouter)(Home);

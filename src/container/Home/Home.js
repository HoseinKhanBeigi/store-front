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
    data: "Home",
    hidden: true,
    opacityValue: 0
  };

  componentDidMount() {
    this.handleOpen();
  }

  handlePicesOpen = el => {
    return new Promise((resolve, reject) => {
      setTimeout(
        () =>
          resolve(
            el.classList.remove("revealer--right"),
            el.classList.remove("revealer--hideX"),
            el.classList.add("revealer--left"),
            el.classList.add("revealer--showX")
          ),
        500
      );
    });
  };

  handleOpen = async () => {
    const newElementAll = document.querySelectorAll(".revealer");
    for (var i = 0; i < newElementAll.length; i++) {
      await this.handlePicesOpen(newElementAll[i]);
    }
  };

  handlePicesClose = el => {
    return new Promise((resolve, reject) => {
      setTimeout(
        () =>
          resolve(
            el.classList.remove("revealer--left"),
            el.classList.remove("revealer--showX"),
            el.classList.add("revealer--right"),
            el.classList.add("revealer--hideX")
          ),
        500
      );
    });
  };

  handleClose = async () => {
    const newElementAll = document.querySelectorAll(".revealer");
    for (var i = 0; i < newElementAll.length; i++) {
      await this.handlePicesClose(newElementAll[i]);
    }
  };

  render() {
    const { data, opacityValue } = this.state;

    const symbol = (
      <polygon points="14.1333333 2.61666667 18.9333333 7.41666667 0 7.41666667 0 10.0833333 18.9333333 10.0833333 14.1333333 14.8833333 16 16.75 24 8.75 16 0.75" />
    );

    return (
      <div>
        <button
          onClick={() => {
            this.handleOpen();
          }}
        >
          open
        </button>
        <button
          onClick={() => {
            this.handleClose();
          }}
        >
          close
        </button>
        <main>
          <div className="grid grid--layout-1">
            <div className="grid__item">
              <div className="revealer" />
            </div>
            <div className="grid__item">
              <div className="revealer" />
            </div>
            <div className="grid__item">
              <div className="revealer" />
            </div>
            <div className="grid__item">
              <div className="revealer" />
            </div>
            <div className="grid__item">
              <div className="revealer" />
            </div>
            <div className="grid__item">
              <div className="revealer" />
            </div>
            <div className="grid__item">
              <div className="revealer" />
            </div>
            <div className="grid__item">
              <div className="revealer" />
            </div>
            <div className="grid__item">
              <div className="revealer" />
            </div>
            <div className="grid__item">
              <div className="revealer" />
            </div>
            <div className="grid__item">
              <div className="revealer" />
            </div>
            <div className="grid__item">
              <div className="revealer" />
            </div>
            <div className="grid__item">
              <div className="revealer" />
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default compose(withRouter)(Home);

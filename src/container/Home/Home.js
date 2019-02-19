/* @flow */

import React, { PureComponent } from "react";
import { compose } from "redux";
import { withRouter } from "react-router-dom";

import Skilll from "./Skilll";

type State = {
  data: Array<String>,
  onMous: Boolean
};

class Home extends PureComponent<State> {
  state = {
    data: "Home",
    hidden: true,
    opacityValue: 0,
    skills: [
      { name: "javascript/html/css/sass", num: 95 },
      { name: "react/vue/angular", num: 90 },
      { name: "nodejs", num: 50 },
      { name: "webpack", num: 70 },
      { name: "mongoDB", num: 40 },
      { name: "python/ruby", num: 30 },
      { name: "webSocket/RabbitMQ", num: 70 },
      { name: "GraphQL/Apollo", num: 70 },
      { name: "jest", num: 70 }
    ]
  };

  componentDidMount() {
    this.handleOpen();

    const portfoli1 = document.querySelector(".portfoli1");

    portfoli1.addEventListener("mouseenter", () => {
      console.log("hii");
    });
  }

  handlePicesOpen = el =>
    new Promise((resolve, reject) => {
      setTimeout(
        () =>
          resolve(
            el.classList.remove("revealer--right"),
            el.classList.remove("revealer--hideX"),
            el.classList.add("revealer--left"),
            el.classList.add("revealer--showX")
          ),
        0
      );
    });

  handleOpen = async () => {
    this.setState({ opacityValue: 1 });
    const newElementAll = document.querySelectorAll(".revealer");
    for (let i = 0; i < newElementAll.length; i++) {
      await this.handlePicesOpen(newElementAll[i]);
    }
  };

  handlePicesClose = el =>
    new Promise((resolve, reject) => {
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

  handleClose = async () => {
    const newElementAll = document.querySelectorAll(".revealer");
    for (let i = 0; i < newElementAll.length; i++) {
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

        <main className="maino">
          <div className="tooltip">
            Hover over me
            <span className="tooltiptext">Tooltip text</span>
          </div>
          <div
            className="grid grid--layout-1"
            style={{ opacity: opacityValue }}
          >
            <div className="grid__item" style={{ display: "none" }}>
              <div className="revealer revealer--right revealer--hideX" />
              <div
                className="grim__item-inner"
                style={{ opacity: 1, transform: `translateY(${0}%)` }}
              >
                <h3
                  className="grim__item-title"
                  style={{
                    textAlign: "center",
                    fontFamily: "monospace",
                    fontSize: "20px",
                    lineHeight: "2em"
                  }}
                >
                  hossein khan beigi
                </h3>
              </div>
            </div>
            <div className="grid__item">
              <div className="revealer revealer--right revealer--hideX" />
              <div
                className="grim__item-inner"
                style={{ opacity: 1, transform: `translateY(${0}%)` }}
              >
                <span
                  className="grim__item-desc"
                  style={{
                    textAlign: "center",
                    fontFamily: "monospace",
                    display: "flex",
                    flexDirection: "column"
                  }}
                >
                  <span> Address: tehran - iran</span>
                  <span> Phone: +9809383345749</span>
                  <span> E-mail: hoseinkhanbeigi@gmail.com</span>
                </span>
              </div>
            </div>

            <div className="grid__item">
              <div className="revealer revealer--right revealer--hideX" />
              <div
                className="grim__item-inner"
                style={{ opacity: 1, transform: `translateY(${0}%)` }}
              >
                <span
                  className="grim__item-desc"
                  style={{
                    fontFamily: "monospace"
                  }}
                >
                  javascript engineer specialist with 4+ experience at 2
                  company.profetional experience in developing compelex Element
                  in any web & webApp based on js-css-html with along tech like
                  react-redux Vue-VueX angular. seeking to further career by
                  growing with passion for the learning new things.
                  <span style={{ color: "black", fontSize: "22px" }}>
                    in currently i fucusing in my homeWork implimenting and
                    create any Component.with js/css/html based on react-redux
                    or any SPA
                  </span>
                </span>
              </div>
            </div>
            <Skilll skills={this.state.skills} />
            <div className="grid__item">
              <div className="revealer revealer--right revealer--hideX" />
              <div
                className="grim__item-inner"
                style={{ opacity: 1, transform: `translateY(${0}%)` }}
              >
                <h3 className="grim__item-title"> hossein khan beigi</h3>
              </div>
            </div>
            <div className="grid__item">
              <div className="revealer revealer--right revealer--hideX" />
              <div
                className="grim__item-inner"
                style={{ opacity: 1, transform: `translateY(${0}%)` }}
              >
                <span className="grim__item-desc">
                  javascript developer at datisParse datisPars.com develop
                  functionality for make features and improve bugs with using js
                  with along dependencies into app which developed with polymer
                  and after time does turn change to react-redux
                </span>
              </div>
            </div>
            <div className="grid__item">
              <div className="revealer revealer--right revealer--hideX" />
              <div
                className="grim__item-inner"
                style={{ opacity: 1, transform: `translateY(${0}%)` }}
              >
                <span className="grim__item-desc">
                  react developer at RoundTableApp roundtableapps.com develop
                  functionality for make features and improve bugs and convert
                  wireFrame to html/css with using js with along dependencies.
                  we did implement projects with react-redux
                </span>
              </div>
            </div>
            <div className="grid__item">
              <div className="revealer revealer--right revealer--hideX" />
              <div
                className="grim__item-inner"
                style={{ opacity: 1, transform: `translateY(${0}%)` }}
              >
                <h3 className="grim__item-title">Experience</h3>
                <span className="grim__item-desc" />
              </div>
            </div>
            <div className="grid__item">
              <div className="revealer revealer--right revealer--hideX" />
              <div
                className="grim__item-inner"
                style={{ opacity: 1, transform: `translateY(${0}%)` }}
              >
                <h3 className="grim__item-title">portfolio</h3>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div className="tooltip">
                    <div
                      style={{
                        width: `${10}%`,
                        backgroundColor: "white",
                        margin: "10px",
                        padding: "20px"
                      }}
                      className="grid__item2 portfoli1"
                    >
                      <div className="revealer revealer--right revealer--hideX" />
                    </div>
                    <span className="tooltiptext">Tooltip text</span>
                  </div>

                  <div
                    style={{
                      width: `${10}%`,
                      backgroundColor: "white",
                      height: "11px",
                      margin: "10px",
                      padding: "20px"
                    }}
                    className="grid__item2"
                  >
                    <div className="revealer revealer--right revealer--hideX" />
                  </div>
                  <div
                    style={{
                      width: `${10}%`,
                      backgroundColor: "white",
                      height: "11px",
                      margin: "10px",
                      padding: "20px"
                    }}
                    className="grid__item2"
                  >
                    <div className="revealer revealer--right revealer--hideX" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default compose(withRouter)(Home);

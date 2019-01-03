/* @flow */

import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import { hot } from "react-hot-loader";
import { Icon } from "antd";
import SearchBox from "../SearchBox/SearchBox";
import { Woman, Men, Kids, Sport } from "../ContainerMenu";
import logo from "../../theme/pic.png";

type State = {
  data: String
};

class TopMenuBar extends PureComponent<State> {
  state = {
    data: "Home"
  };

  render() {
    const { data } = this.state;

    return (
      <div className="container">
        <div className="headerTop">
          <div className="logoMeno">
            <img src={logo} className="imageLogo" />
          </div>
          <SearchBox />
          <div className="regesteri">
            <li>
              <span>ثبت نام</span>
              <span>/</span>
              <span>ورود</span>{" "}
            </li>
            <li>
              <span>سبد خرید</span>
              <span>
                <Icon type="shopping" />
              </span>
            </li>
          </div>
        </div>
        <div className="main">
          <nav className="cbp-hsmenu-wrapper" id="cbp-hsmenu-wrapper">
            <div className="cbp-hsinner">
              <ul className="cbp-hsmenu">
                <Woman />
                <Men />
                <Kids />
                <Sport />
              </ul>
            </div>
          </nav>
        </div>
      </div>
    );
  }
}

export default hot(module)(TopMenuBar);

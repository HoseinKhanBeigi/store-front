/* @flow */

import React, { PureComponent } from "react";
import { renderRoutes } from "react-router-config";
import { Link } from "react-router-dom";
import { hot } from "react-hot-loader";
import styles from "./styles.scss";

type State = {
  data: String
};

type Props = { route: Object };

class Header extends PureComponent<Props, State> {
  state = {
    data: "Header"
  };

  render() {
    const { data } = this.state;
    const { route } = this.props;
    console.log(data);
    return (
      <div className={styles.headerPage}>
        <ul className={styles.ull}>
          <li className={styles.lii}>
            <Link to="/">Home</Link>
          </li>
          <li className={styles.lii}>
            <Link to="/storegallery">Woman</Link>
          </li>
          <li className={styles.lii}>
            <Link to="/storegallery">Men</Link>
          </li>
          <li className={styles.lii}>
            <Link to="/storegallery">Childs</Link>
          </li>
        </ul>
        {renderRoutes(route.routes)}
      </div>
    );
  }
}

export default hot(module)(Header);

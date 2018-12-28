/* @flow */

import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { hot } from 'react-hot-loader';

type State = {
  data: String
};

class TopMenuBar extends PureComponent<State> {
  state = {
    data: 'Home'
  };

  render() {
    const { data } = this.state;
    return (
      <ul>
        <li>
          <Link to="/">{data}</Link>
        </li>
        <li>
          <Link to="/storegallery">Woman</Link>
        </li>
        <li>
          <Link to="/storegallery">Men</Link>
        </li>
        <li>
          <Link to="/storegallery">Childs</Link>
        </li>
      </ul>
    );
  }
}

export default hot(module)(TopMenuBar);

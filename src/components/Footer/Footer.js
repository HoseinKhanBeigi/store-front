/* @flow */

import React, { PureComponent } from 'react';
import { hot } from 'react-hot-loader';

type State = {
  data: String
};

class Footer extends PureComponent<State> {
  state = {
    data: 'footer'
  };

  render() {
    const { data } = this.state;
    return <div>{data}</div>;
  }
}

export default hot(module)(Footer);

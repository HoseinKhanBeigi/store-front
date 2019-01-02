/* @flow */

import React, { PureComponent } from 'react';
import { hot } from 'react-hot-loader';

import CostumerService from './CostumerServise';

type State = {
  data: String
};

class Footer extends PureComponent<State> {
  state = {
    data: 'footer'
  };

  render() {
    const { data } = this.state;
    return (
      <footer>
        <CostumerService />
      </footer>
    );
  }
}

export default hot(module)(Footer);

/* @flow */

import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';

type State = {
  data: Array<String>,
  onMous: Boolean
};

class Home extends PureComponent<State> {
  state = {
    data: 'Home'
  };

  render() {
    const { data } = this.state;

    return <div>home</div>;
  }
}

export default compose(withRouter)(Home);

/* @flow */

import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';

type State = {
  data: Array<String>,
  onMous: Boolean
};

class Woman extends PureComponent<State> {
  state = {
    data: 'Woman'
  };

  render() {
    const { data } = this.state;
    return (
      <div>
        <h1>{data}</h1>
      </div>
    );
  }
}

export default compose(withRouter)(Woman);

/* @flow */

import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { ProductSlider } from '../../components';

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

    return (
      <div>
        <ProductSlider />
      </div>
    );
  }
}

export default compose(withRouter)(Home);

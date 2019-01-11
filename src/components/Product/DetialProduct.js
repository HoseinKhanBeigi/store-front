/* @flow */

import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';

type State = {};

class DetialProduct extends PureComponent<Props, State> {
  state = {};

  render() {
    return <div className="standard-product-column-right">Detial</div>;
  }
}

export default compose(withRouter)(DetialProduct);

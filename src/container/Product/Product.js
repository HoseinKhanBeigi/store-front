/* @flow */

import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import {
  ThumbnailSlider,
  DetialProduct,
  ProductSliderVertical
} from '../../components';

type State = {};

class Product extends PureComponent<Props, State> {
  state = {};

  render() {
    return (
      <main className="mainOne">
        <div className="standard-product-page-main product-page">
          <div className="standard-product-container">
            <ThumbnailSlider />
          </div>
        </div>
      </main>
    );
  }
}

export default compose(withRouter)(Product);

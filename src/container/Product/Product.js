/* @flow */

import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { ThumbnailSlider } from '../../components';

import logo1 from '../../theme/pic1.jpeg';
import logo2 from '../../theme/pic2.jpeg';

type State = {};

class Product extends PureComponent<Props, State> {
  state = {
    images: [
      logo1,
      logo2,
      logo1,
      logo2,
      logo1,
      logo2,
      logo1,
      logo2,
      logo1,
      logo2,
      logo1,
      logo2
    ]
  };

  render() {
    const { images } = this.state;
    return (
      <main className="mainOne">
        <div className="standard-product-page-main product-page">
          <div className="standard-product-container">
            <ThumbnailSlider
              images={images}
              direction="vertical"
              isTouch="true"
            />
          </div>
        </div>
      </main>
    );
  }
}

export default compose(withRouter)(Product);

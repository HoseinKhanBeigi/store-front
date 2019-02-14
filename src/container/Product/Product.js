/* @flow */

import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { Icon } from 'antd';
import { ThumbnailSlider } from '../../components';
import logo1 from '../../theme/pic1.jpeg';
import logo2 from '../../theme/pic2.jpeg';

type State = {};

class Product extends PureComponent<Props, State> {
  state = {
    images: [logo1, logo2, logo1, logo2, logo1, logo2, logo1]
  };

  render() {
    const { images } = this.state;
    return (
      <ThumbnailSlider
        images={images}
        direction="vertical"
        isButtom={false}
        isTouch="true"
        gapBetweenThumbnail={30}
        numberOfThumpImage={6}
        previousIcon={<Icon type="left" className="arrow" />}
        nextIcon={<Icon type="right" className="arrow" />}
        zoomInIcon={<Icon type="zoom-in" className="arrow" />}
        zoomOutIcon={<Icon type="zoom-out" className="arrow" />}
      />
    );
  }
}

export default compose(withRouter)(Product);

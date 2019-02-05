/* @flow */

import React, { PureComponent } from "react";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import Slider from "react-slick";
import ThumbnailSliderHorizontal from "./ThumbnailSliderHorizontal";

type State = {};

class ThumbnailSlider extends PureComponent<Props, State> {
  state = {};

  render() {
    return (
      <Slider {...settings}>
        <div>
          <div className="slide-0">
            <h3>Graph 1</h3>
          </div>
        </div>
        <div>
          <div className="slide-1">
            <h3>Graph 2</h3>
          </div>
        </div>
        <div>
          <div className="slide-2">
            <h3>Graph 3</h3>
          </div>
        </div>
        <div>
          <div className="slide-3">
            <h3>Set Up</h3>
          </div>
        </div>
      </Slider>
    );
  }
}

export default compose(withRouter)(ThumbnailSlider);

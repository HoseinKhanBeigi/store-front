/* @flow */

import React, { PureComponent } from "react";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import logo from "../../theme/pic.png";
import logo1 from "../../theme/pic1.jpeg";
import logo2 from "../../theme/pic2.jpeg";

type State = {
  images: Array,
  index: number
};

class ProductSlider extends PureComponent<Props, State> {
  state = { images: [logo, logo1, logo2], index: 0 };

  handlePrevious = () => {
    const { images, index } = this.state;
    if (index > 0) {
      this.setState({ index: this.state.index - 1 });
    }
  };

  handleNext = () => {
    const { images, index } = this.state;
    if (index + 1 <= images.length - 1) {
      this.setState({ index: this.state.index + 1 });
    }
  };

  render() {
    const { images, index } = this.state;

    return (
      <div className="u-centred">
        <button onClick={() => this.handlePrevious()}>Previous Image</button>
        <button onClick={() => this.handleNext()}>Next Image</button>
        <ul className="swiper-wrapper">
          {images.map((el, i) => (
            <li
              key={i}
              className="swiper-slide"
              style={{
                width: "426px",
                transform: `translate3d(${i * -426}px, 0px, 0px)`,
                visibility: i === index ? "visible" : "hidden"
              }}
            >
              <img src={el} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default compose(withRouter)(ProductSlider);

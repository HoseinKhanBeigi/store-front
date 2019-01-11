/* @flow */

import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import logo from '../../theme/pic.png';
import logo1 from '../../theme/pic1.jpeg';
import logo2 from '../../theme/pic2.jpeg';

type State = {
  images: Array,
  index: number,
  newSize: number
};

class ProductSlider extends PureComponent<Props, State> {
  state = { images: [logo, logo1, logo2], index: 0, newSize: 426 };

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

  componentDidMount() {
    window.addEventListener('resize', () => {
      const withAli = document.querySelector('.swiper-slide');
      const rect = withAli.getBoundingClientRect();
      const width =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;
      if (width < 1230) {
        const ss = width - 803;
        this.setState({ newSize: 426 });
      }
      if (width < 1025) {
        this.setState({ newSize: 510 });
      }
      if (width < 768) {
        this.setState({ newSize: 100 });
      }
    });
  }

  render() {
    const { images, index, newSize } = this.state;

    console.log(newSize);
    const range = newSize === 100 ? '%' : 'px';
    return (
      <div className="standard-product-column-left">
        <div className="u-centred">
          <button
            className="swiper-button-prev"
            onClick={() => this.handlePrevious()}
          >
            Previous Image
          </button>
          <button
            className="swiper-button-next"
            onClick={() => this.handleNext()}
          >
            Next Image
          </button>
          <ul className="swiper-wrapper">
            {images.map((el, i) => (
              <li
                key={i}
                className="swiper-slide"
                style={{
                  width: `${newSize}${range}`,
                  opacity: 1,
                  transform: `translate3d(${i * -newSize}${range}, 0, 0)`,
                  visibility: i === index ? 'visible' : 'hidden',
                  transitionDuration: '300ms'
                }}
              >
                <img src={el} />
              </li>
            ))}
          </ul>
          <button className="slider-trigger-zoom" type="button">
            <span className="slider-trigger-zoom__icon slider-trigger-zoom__icon--zoom-in" />
          </button>
        </div>
        <div className="thumbnail-container">
          <ul
            className="thumbnail-wrapper"
            style={{ transform: 'translateX(0px)' }}
          >
            <li className="thumbnail-slide">
              <img src={logo} width="100vm" />
            </li>
            <li className="thumbnail-slide">
              <img src={logo1} width="100vm" />
            </li>
            <li className="thumbnail-slide">
              <img src={logo2} width="100vm" />
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default compose(withRouter)(ProductSlider);

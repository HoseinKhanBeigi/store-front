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
  newSize: number,
  sizeOfTranslate_x: number,
  numberOfThumpImage: number
};

class ProductSlider extends PureComponent<Props, State> {
  state = {
    images: [logo, logo1, logo2],
    index: 0,
    newSize: 486,
    sizeOfTranslate_x: 0,
    numberOfThumpImage: 5
  };

  componentDidMount() {
    const withAli = document
      .querySelector('.standard-product-column-left')
      .getBoundingClientRect();
    this.setState({ newSize: withAli.width });
    window.addEventListener('resize', () => {
      const withAli2 = document.querySelector('.standard-product-column-left');
      const rect2 = withAli2.getBoundingClientRect();
      this.setState({
        newSize: rect2.width,
        numberOfThumpImage: 5,
        sizeOfTranslate_x: 0
      });
    });
  }

  handlePrevious = () => {
    const { index } = this.state;
    if (index > 0) {
      this.setState({ index: index - 1 });
    }
  };

  handleNext = () => {
    const { images, index } = this.state;
    if (index + 1 <= images.length - 1) {
      this.setState({ index: index + 1 });
    }
  };

  CalculateTransform_X = (el, index) => {
    const { numberOfThumpImage, sizeOfTranslate_x } = this.state;
    const thumbnailSlide = el.target.parentNode.getBoundingClientRect();
    const thumbnailWrapper = document
      .querySelector('.thumbnail-slide')
      .getBoundingClientRect();
    const positionDetected = thumbnailSlide.x;
    const GETSIZE = thumbnailSlide.width + 8;
    const firstPointDistanceClick = thumbnailWrapper.left;
    const secondPoinDistanceClick =
      thumbnailSlide.width * numberOfThumpImage +
      8 * numberOfThumpImage +
      thumbnailWrapper.left;

    if (positionDetected === secondPoinDistanceClick) {
      this.setState({
        numberOfThumpImage: numberOfThumpImage + 1,
        sizeOfTranslate_x: sizeOfTranslate_x - GETSIZE
      });
    }
    if (index === 0) {
      this.setState({
        sizeOfTranslate_x: 0
      });
    } else if (
      firstPointDistanceClick ===
      thumbnailSlide.x + sizeOfTranslate_x
    ) {
      this.setState({
        sizeOfTranslate_x: sizeOfTranslate_x + GETSIZE,
        numberOfThumpImage: numberOfThumpImage - 1
      });
    }
  };

  render() {
    const { images, index, newSize, sizeOfTranslate_x } = this.state;
    const range = newSize === 100 ? '%' : 'px';

    const imageTump = [
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
      logo2,
      logo1,
      logo2
    ];

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
            style={{ transform: `translateX(${sizeOfTranslate_x}px)` }}
          >
            {imageTump.map((el, i) => (
              <li
                key={i}
                className="thumbnail-slide"
                style={{
                  marginRight: '8px',
                  width: 'calc((100% - 40px) / 5.5)'
                }}
                onClick={e => {
                  this.CalculateTransform_X(e, i);
                }}
              >
                <img src={el} width="100vm" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default compose(withRouter)(ProductSlider);

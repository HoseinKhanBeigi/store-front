/* @flow */

import React, { PureComponent } from "react";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import logo1 from "../../theme/pic1.jpeg";
import logo2 from "../../theme/pic2.jpeg";

type State = {
  images: Array,
  index: number,
  sizeWidth: number,
  sizeOfTranslate_x: number,
  numberOfThumpImage: number
};

class ProductSlider extends PureComponent<Props, State> {
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
      logo2,
      logo1,
      logo2
    ],
    index: 0,
    sizeWidth: 486,
    sizeOfTranslate_x: 0,
    numberOfThumpImage: 5,
    allIndex: []
  };

  componentDidMount() {
    const thumbnailSlideList = document.querySelectorAll(".thumbnail-slide");
    thumbnailSlideList[0].classList.add("thumbnail-slide-active");
    const initialSizeOfSwiper = document
      .querySelector(".standard-product-column-left")
      .getBoundingClientRect();
    const thumbnailWrapper = document
      .querySelector(".thumbnail-wrapper")
      .getBoundingClientRect();
    const thumbnailSlide = document
      .querySelector(".thumbnail-slide")
      .getBoundingClientRect();
    this.setState({
      sizeWidth: initialSizeOfSwiper.width,
      numberOfThumpImage: Math.round(
        thumbnailWrapper.width / (thumbnailSlide.width + 8)
      )
    });

    window.addEventListener("resize", () => {
      const SizeOfSwiper = document
        .querySelector(".standard-product-column-left")
        .getBoundingClientRect();

      this.setState({
        sizeWidth: SizeOfSwiper.width,
        numberOfThumpImage: Math.round(
          thumbnailWrapper.width / (thumbnailSlide.width + 8)
        ),
        sizeOfTranslate_x: 0
      });
    });
  }

  handlePrevious = () => {
    const { index } = this.state;
    const thumbnailSlideList = document.querySelectorAll(".thumbnail-slide");
    if (index > 0) {
      this.setState({ index: index - 1 });
      this.calculateTransform(thumbnailSlideList[index - 1], index - 1);
    }
  };

  handleNext = () => {
    const { images, index } = this.state;
    const thumbnailSlideList = document.querySelectorAll(".thumbnail-slide");
    if (index + 1 <= images.length - 1) {
      this.setState({
        index: index + 1
      });
      this.calculateTransform(thumbnailSlideList[index + 1], index + 1);
    }
  };

  calculateTransform = (el, index) => {
    const { numberOfThumpImage, sizeOfTranslate_x } = this.state;
    const thumbnailWrapper = document
      .querySelector(".thumbnail-wrapper")
      .getBoundingClientRect();
    const thumbnailSlideList = document.querySelectorAll(".thumbnail-slide");
    const ElEMENT = el.target ? el.target.parentNode : el;
    const thumbnailSlide = ElEMENT.getBoundingClientRect();

    const positionDetected = thumbnailSlide.x;
    const GETSIZE = thumbnailSlide.width + 8;
    const firstPointClick = thumbnailWrapper.left;
    const secondPoinClick =
      thumbnailSlide.width * numberOfThumpImage +
      8 * numberOfThumpImage +
      thumbnailWrapper.left;

    thumbnailSlideList.forEach((element, i) => {
      element.classList.remove("thumbnail-slide-active");
    });
    ElEMENT.classList.add("thumbnail-slide-active");

    if (Math.round(positionDetected) === Math.round(secondPoinClick)) {
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
      Math.round(firstPointClick) ===
      Math.round(thumbnailSlide.x + sizeOfTranslate_x)
    ) {
      this.setState({
        sizeOfTranslate_x: sizeOfTranslate_x + GETSIZE,
        numberOfThumpImage: numberOfThumpImage - 1
      });
    }
  };

  handleChangeTransform = (el, index) => {
    this.calculateTransform(el, index);
  };

  handleChangeThumbnail = i => {
    this.setState({ index: i });
  };

  render() {
    const { images, index, sizeWidth, sizeOfTranslate_x } = this.state;
    const range = sizeWidth === 100 ? "%" : "px";

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
                  width: `${sizeWidth}${range}`,
                  opacity: 1,
                  transform: `translate3d(${i * -sizeWidth}${range}, 0, 0)`,
                  visibility: i === index ? "visible" : "hidden",
                  transitionDuration: "300ms"
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
            {images.map((el, i) => (
              <li
                key={i}
                className="thumbnail-slide"
                style={{
                  marginRight: "8px",
                  width: "calc((100% - 40px) / 5.5)"
                }}
                onClick={e => {
                  this.handleChangeTransform(e, i);
                  this.handleChangeThumbnail(i);
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

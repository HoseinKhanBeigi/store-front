/* @flow */

import React, { PureComponent } from "react";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import { Icon } from "antd";
import logo1 from "../../theme/pic1.jpeg";
import logo2 from "../../theme/pic2.jpeg";

type State = {
  images: Array,
  index: number,
  sizeWidth: number,
  sizeOfTranslate_x: number,
  numberOfThumpImage: number,
  swiperSlideWidth: number
};

class ThumbnailSliderVertical extends PureComponent<Props, State> {
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
    allIndex: [],
    swiperSlideWidth: 0,
    swiperSlideHeight: undefined
  };

  componentDidMount() {
    const thumbnailSlideList = document.querySelectorAll(".thumbnail-slideVer");
    thumbnailSlideList[0].classList.add("thumbnail-slide-active");
    const initialSizeOfSwiper = document
      .querySelector(".standard-product-column-leftVertical")
      .getBoundingClientRect();

    const swiperSlide = document
      .querySelector(".swiper-wrapper")
      .getBoundingClientRect();

    console.log(swiperSlide.height);

    this.setState({
      sizeWidth: initialSizeOfSwiper.width,
      swiperSlideHeight: swiperSlide.height + 17
    });

    window.addEventListener("resize", () => {
      const SizeOfSwiper = document
        .querySelector(".standard-product-column-leftVertical")
        .getBoundingClientRect();

      const swiperSlideResize = document
        .querySelector(".swiper-wrapper")
        .getBoundingClientRect();

      this.setState({
        swiperSlideWidth: SizeOfSwiper.width,
        sizeWidth: SizeOfSwiper.width,
        swiperSlideHeight: swiperSlideResize.height + 17,
        sizeOfTranslate_x: 0
      });
    });
  }

  handlePrevious = () => {
    const { index } = this.state;
    const thumbnailSlideList = document.querySelectorAll(".thumbnail-slideVer");
    const swiperSlide = document
      .querySelector(".standard-product-column-leftVertical")
      .getBoundingClientRect().width;
    if (index > 0) {
      this.setState({ index: index - 1, swiperSlideWidth: swiperSlide });
      this.calculateTransform(thumbnailSlideList[index - 1], index - 1);
    }
  };

  handleNext = () => {
    const { images, index } = this.state;
    const thumbnailSlideList = document.querySelectorAll(".thumbnail-slideVer");

    const swiperSlide = document
      .querySelector(".standard-product-column-leftVertical")
      .getBoundingClientRect().width;

    if (index + 1 <= images.length - 1) {
      this.setState({
        index: index + 1,
        swiperSlideWidth: swiperSlide
      });
      this.calculateTransform(thumbnailSlideList[index + 1], index + 1);
    }
  };

  calculateTransform = (el, index) => {
    const { sizeOfTranslate_x } = this.state;

    const thumbnailContainer = document
      .querySelector(".thumbnail-containerVertical")
      .getBoundingClientRect();

    const thumbnailSlideList = document.querySelectorAll(".thumbnail-slideVer");
    const ElEMENT = el.target ? el.target.parentNode : el;
    const thumbnailSlide = ElEMENT.getBoundingClientRect();

    const positionDetected = thumbnailSlide.y;
    const GETSIZE = thumbnailSlide.height + 42;
    const firstPointClick = thumbnailContainer.top;

    const secondPoinClick = thumbnailSlide.height * 3 + 42 * 3;

    thumbnailSlideList.forEach((element, i) => {
      element.classList.remove("thumbnail-slide-active");
    });
    ElEMENT.classList.add("thumbnail-slide-active");

    if (Math.round(positionDetected) === Math.round(secondPoinClick)) {
      this.setState({
        sizeOfTranslate_x: sizeOfTranslate_x - GETSIZE
      });
    }
    if (index === 0) {
      this.setState({
        sizeOfTranslate_x: 0
      });
    } else if (Math.round(firstPointClick) === Math.round(positionDetected)) {
      this.setState({
        sizeOfTranslate_x: sizeOfTranslate_x + GETSIZE
      });
    }
  };

  handleChangeTransform = (el, index) => {
    const SizeOfSwiper = document
      .querySelector(".standard-product-column-leftVertical")
      .getBoundingClientRect();

    console.log(SizeOfSwiper);

    this.setState({
      swiperSlideWidth: SizeOfSwiper.width
    });
    this.calculateTransform(el, index);
  };

  handleChangeThumbnail = i => {
    this.setState({ index: i });
  };

  render() {
    const {
      images,
      index,
      sizeWidth,
      sizeOfTranslate_x,
      swiperSlideHeight,
      swiperSlideWidth
    } = this.state;

    const range = sizeWidth === 100 ? "%" : "px";

    const sie = swiperSlideWidth;

    return (
      <div className="standard-product-column-leftVertical">
        <div className="u-centred">
          <button
            className="swiper-button-prev"
            onClick={() => this.handlePrevious()}
          >
            <Icon type="left" className="arrow" />
          </button>
          <button
            className="swiper-button-next"
            onClick={() => this.handleNext()}
          >
            <Icon type="right" className="arrow" />
          </button>
          <ul className="swiper-wrapper">
            {images.map((el, i) => (
              <li
                key={i}
                className="swiper-slide"
                style={{
                  width: `${sizeWidth}${range}`,
                  opacity: 1,
                  transform: `translateX(-${sie * index}px)`,
                  visibility: i === index ? "visible" : "hidden"
                }}
              >
                <img src={el} className="Img" />
              </li>
            ))}
          </ul>
          <button className="slider-trigger-zoom" type="button">
            <Icon type="zoom-in" className="zoomIn" />
          </button>
        </div>

        <div
          className="thumbnail-containerVertical"
          style={{
            height: `${swiperSlideHeight}px`
          }}
        >
          <ul
            className="thumbnail-wrapperVertical"
            style={{
              transform: `translateY(${sizeOfTranslate_x}px)`
            }}
          >
            {images.map((el, i) => (
              <li
                key={i}
                className="thumbnail-slideVer"
                style={{
                  marginBottom: "42px"
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

export default compose(withRouter)(ThumbnailSliderVertical);

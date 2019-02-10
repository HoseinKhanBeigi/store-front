/* @flow */

import React, { PureComponent } from "react";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import { Icon } from "antd";

type Props = {
  images: Array,
  direction: String,
  isTouch: String
};

type State = {
  images: Array,
  index: number,
  sizeWidth: number,
  sizeOfTranslate: number,
  numberOfThumpImage: number,
  swiperSlideWidth: number,
  clientX: number,
  clientY: number
};

class ThumbnailSlider extends PureComponent<Props, State> {
  state = {
    index: 0,
    sizeWidth: 486,
    sizeOfTranslate: 0,
    numberOfThumpImage: 5,
    allIndex: [],
    swiperSlideWidth: 0,
    swiperSlideHeight: undefined,
    clientX: 0,
    clientY: 0
  };

  componentDidMount() {
    const { direction, isTouch } = this.props;

    const thumbnailSlideList =
      direction === "horizontal"
        ? document.querySelectorAll(".thumbnail-slide")
        : document.querySelectorAll(".thumbnail-slideVer");

    thumbnailSlideList[0].classList.add("thumbnail-slide-active");

    const initialSizeOfSwiper =
      direction === "horizontal"
        ? document
            .querySelector(".standard-product-column-left")
            .getBoundingClientRect()
        : document
            .querySelector(".standard-product-column-leftVertical")
            .getBoundingClientRect();

    const thumbnailWrapper =
      direction === "horizontal" &&
      document.querySelector(".thumbnail-wrapper").getBoundingClientRect();
    const thumbnailSlide =
      direction === "horizontal" &&
      document.querySelector(".thumbnail-slide").getBoundingClientRect();
    const swiperSlide = document
      .querySelector(".swiper-wrapper")
      .getBoundingClientRect();

    const rightResultForHeight =
      swiperSlide.height === 0
        ? initialSizeOfSwiper.height
        : swiperSlide.height;

    this.setState({
      swiperSlideHeight: rightResultForHeight,
      sizeWidth: initialSizeOfSwiper.width,
      numberOfThumpImage: Math.round(
        thumbnailWrapper.width / (thumbnailSlide.width + 8)
      )
    });

    // handleTouch method for screen mobile and tablet
    if (isTouch !== "false") {
      this.handleTouch();
    }

    // (3) move the ball on mousemove

    document.querySelector(".Img").addEventListener("mousedown", () => {
      document
        .querySelector(".Img")
        .addEventListener("mousemove", calculateTransformZoom);
    });

    document.querySelector(".Img").addEventListener("mouseup", () => {
      document
        .querySelector(".Img")
        .removeEventListener("mousemove", calculateTransformZoom);
    });

    function calculateTransformZoom(e) {
      const img = document.querySelector(".Img");
      const shiftX = e.clientX - img.getBoundingClientRect().left;
      const shiftY = e.clientY - img.getBoundingClientRect().y;
      console.log(e.pageX);
      // this.setState({
      //   clientX: Math.round(e.pageX - shiftX)
      //   // clientY: e.pageY - shiftY
      // });
    }

    document.querySelector(".Img").ondragstart = function() {
      return false;
    };

    window.addEventListener("resize", () => {
      const { direction } = this.props;
      const SizeOfSwiper =
        direction === "horizontal"
          ? document
              .querySelector(".standard-product-column-left")
              .getBoundingClientRect()
          : document
              .querySelector(".standard-product-column-leftVertical")
              .getBoundingClientRect();

      const swiperSlideResize = document
        .querySelector(".swiper-wrapper")
        .getBoundingClientRect();

      this.setState({
        swiperSlideHeight: SizeOfSwiper.height,
        swiperSlideWidth: SizeOfSwiper.width,
        sizeWidth: SizeOfSwiper.width,
        numberOfThumpImage: Math.round(
          thumbnailWrapper.width / (thumbnailSlide.width + 8)
        ),
        sizeOfTranslate: 0
      });
    });
  }

  handleTouch = () => {
    const allImages = document.querySelectorAll(".Img");
    allImages.forEach(elemet => {
      let start;
      let end;
      elemet.addEventListener("touchstart", ev => {
        start = Math.round(ev.changedTouches[0].pageX);
      });
      elemet.addEventListener("touchend", ev => {
        end = Math.round(ev.changedTouches[0].pageX);
        if (start > end) {
          this.handleNext();
        }
        if (start < end) {
          this.handlePrevious();
        }
      });
    });
  };

  handlePrevious = () => {
    const { direction } = this.props;
    const { index } = this.state;
    const thumbnailSlideList =
      direction === "horizontal"
        ? document.querySelectorAll(".thumbnail-slide")
        : document.querySelectorAll(".thumbnail-slideVer");
    const swiperSlide =
      direction === "horizontal"
        ? document
            .querySelector(".standard-product-column-left")
            .getBoundingClientRect().width
        : document
            .querySelector(".standard-product-column-leftVertical")
            .getBoundingClientRect().width;
    if (index > 0) {
      this.setState({ index: index - 1, swiperSlideWidth: swiperSlide });
      this.calculateTransform(thumbnailSlideList[index - 1], index - 1);
    }
  };

  handleNext = () => {
    const { direction, images } = this.props;
    const { index } = this.state;
    const thumbnailSlideList =
      direction === "horizontal"
        ? document.querySelectorAll(".thumbnail-slide")
        : document.querySelectorAll(".thumbnail-slideVer");

    const swiperSlide =
      direction === "horizontal"
        ? document
            .querySelector(".standard-product-column-left")
            .getBoundingClientRect().width
        : document
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

  calculateTransformX = (
    thumbnailSlide,
    thumbnailWrapper,
    numberOfThumpImage
  ) => {
    const positionDetected = thumbnailSlide.x;
    const GETSIZE = thumbnailSlide.width + 8;
    const firstPointClick = thumbnailWrapper.left;
    const secondPoinClick =
      thumbnailSlide.width * numberOfThumpImage +
      8 * numberOfThumpImage +
      thumbnailWrapper.left;

    return {
      positionDetected,
      GETSIZE,
      firstPointClick,
      secondPoinClick
    };
  };

  calculateTransformY = (thumbnailSlide, thumbnailContainer) => {
    const positionDetected = thumbnailSlide.y;
    const GETSIZE = thumbnailSlide.height + 22;
    const firstPointClick = thumbnailContainer.top;

    const secondPoinClick = thumbnailSlide.height * 3 + 22 * 3;

    return {
      positionDetected,
      GETSIZE,
      firstPointClick,
      secondPoinClick
    };
  };

  calculateTransform = (el, index) => {
    const { direction } = this.props;
    const { numberOfThumpImage, sizeOfTranslate } = this.state;
    const thumbnailWrapper =
      direction === "horizontal" &&
      document.querySelector(".thumbnail-wrapper").getBoundingClientRect();
    const thumbnailContainer =
      direction === "vertical" &&
      document
        .querySelector(".thumbnail-containerVertical")
        .getBoundingClientRect();
    const thumbnailSlideList =
      direction === "horizontal"
        ? document.querySelectorAll(".thumbnail-slide")
        : document.querySelectorAll(".thumbnail-slideVer");
    const ElEMENT = el.target ? el.target.parentNode : el;
    const thumbnailSlide = ElEMENT.getBoundingClientRect();

    const calculateX =
      direction === "horizontal" &&
      this.calculateTransformX(
        thumbnailSlide,
        thumbnailWrapper,
        numberOfThumpImage
      );

    const calculateY =
      direction === "vertical" &&
      this.calculateTransformY(thumbnailSlide, thumbnailContainer);

    thumbnailSlideList.forEach((element, i) => {
      element.classList.remove("thumbnail-slide-active");
    });
    ElEMENT.classList.add("thumbnail-slide-active");
    if (direction === "horizontal") {
      if (
        Math.round(calculateX.positionDetected) ===
        Math.round(calculateX.secondPoinClick)
      ) {
        this.setState({
          numberOfThumpImage: numberOfThumpImage + 1,
          sizeOfTranslate: sizeOfTranslate - calculateX.GETSIZE
        });
      }
      if (index === 0) {
        this.setState({
          sizeOfTranslate: 0
        });
      } else if (
        Math.round(calculateX.firstPointClick) ===
        Math.round(thumbnailSlide.x + sizeOfTranslate)
      ) {
        this.setState({
          sizeOfTranslate: sizeOfTranslate + calculateX.GETSIZE,
          numberOfThumpImage: numberOfThumpImage - 1
        });
      }
    }

    if (direction === "vertical") {
      if (
        Math.round(calculateY.positionDetected) ===
        Math.round(calculateY.secondPoinClick)
      ) {
        this.setState({
          sizeOfTranslate: sizeOfTranslate - calculateY.GETSIZE
        });
      }
      if (index === 0) {
        this.setState({
          sizeOfTranslate: 0
        });
      } else if (
        Math.round(calculateY.firstPointClick) ===
        Math.round(calculateY.positionDetected)
      ) {
        this.setState({
          sizeOfTranslate: sizeOfTranslate + calculateY.GETSIZE
        });
      }
    }
  };

  handleChangeTransform = (el, index) => {
    const { direction } = this.props;
    this.calculateTransform(el, index);
    const swiperSlide =
      direction === "horizontal"
        ? document
            .querySelector(".standard-product-column-left")
            .getBoundingClientRect().width
        : document
            .querySelector(".standard-product-column-leftVertical")
            .getBoundingClientRect().width;

    this.setState({
      swiperSlideWidth: swiperSlide
    });
  };

  handleChangeThumbnail = i => {
    this.setState({ index: i });
  };

  render() {
    const {
      index,
      sizeWidth,
      sizeOfTranslate,
      swiperSlideWidth,
      swiperSlideHeight,
      clientX,
      clientY
    } = this.state;

    const { direction, images } = this.props;

    const range = sizeWidth === 100 ? "%" : "px";

    const styleHori = {
      marginRight: "8px",
      width: "calc((100% - 40px) / 5.5)"
    };
    const styleVer = {
      marginBottom: "22px"
    };

    const styleVerContainer = {
      height: `${swiperSlideHeight}px`
    };

    const transformY = {
      transform: `translateY(${sizeOfTranslate}px)`
    };

    const transformX = {
      transform: `translateX(${sizeOfTranslate}px)`
    };

    const style = direction === "horizontal" ? styleHori : styleVer;
    const styleVER = direction === "vertical" ? styleVerContainer : {};
    const styleTransform = direction === "horizontal" ? transformX : transformY;

    return (
      <div
        className={
          direction === "horizontal"
            ? "standard-product-column-left"
            : "standard-product-column-leftVertical"
        }
      >
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
          <ul
            className="swiper-wrapper"
            style={{
              transform: `scale(2.5) translate(-${0}px, ${clientY}px)`,
              left: `${clientX}px`
              // transform: `translate(-${clientX}px, ${clientY}px)`
            }}
          >
            {images.map((el, i) => (
              <li
                key={i}
                className="swiper-slide"
                style={{
                  width: `${sizeWidth}${range}`,
                  opacity: 1,
                  transform: `translateX(-${swiperSlideWidth * index}px)`,
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
          className={
            direction === "horizontal"
              ? "thumbnail-container"
              : "thumbnail-containerVertical"
          }
          style={styleVER}
        >
          <ul
            className={
              direction === "horizontal"
                ? "thumbnail-wrapper"
                : "thumbnail-wrapperVertical"
            }
            style={styleTransform}
          >
            {images.map((el, i) => (
              <li
                key={i}
                className={
                  direction === "horizontal"
                    ? "thumbnail-slide"
                    : "thumbnail-slideVer"
                }
                style={style}
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

export default compose(withRouter)(ThumbnailSlider);

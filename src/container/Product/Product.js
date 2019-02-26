/* @flow */

import React, { PureComponent } from "react";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import { Icon } from "antd";
import { ThumbnailSlider } from "../../components";
import logo1 from "../../theme/pic1.jpeg";
import logo2 from "../../theme/pic2.jpeg";

type State = {};

class Product extends PureComponent<Props, State> {
  state = {
    images: [logo1, logo2, logo1, logo2, logo1, logo2, logo1]
  };

  componentDidMount() {
    window.addEventListener("popstate", () => {
      const { history } = this.props;
      history.push("/", { some: "manoto" });
    });
  }

  render() {
    const { images } = this.state;
    return (
      <main className="mainOne">
        <div className="standard-product-page-main">
          <div className="standard-product-container">
            <ThumbnailSlider
              images={images}
              direction="horizontal"
              isButtom={false}
              isTouch="true"
              gapBetweenThumbnail={30}
              numberOfThumpImage={6}
              previousIcon={<Icon type="left" className="arrow" />}
              nextIcon={<Icon type="right" className="arrow" />}
              zoomInIcon={<Icon type="zoom-in" className="arrow" />}
              zoomOutIcon={<Icon type="zoom-out" className="arrow" />}
            />
          </div>
        </div>
      </main>
    );
  }
}

export default compose(withRouter)(Product);

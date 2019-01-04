/* @flow */

import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import { hot } from "react-hot-loader";

type State = {
  data: String
};

class TopMenuBarMobile extends PureComponent<State> {
  state = {
    data: "TopMenuBarMobile"
  };

  render() {
    const { data } = this.state;

    return (
      <div className="container">
        <div className="mp-pusher" id="mp-pusher">
          <nav id="mp-menu" className="mp-menu">
            <div className="mp-level">
              <h2 className="icon icon-world">All Categories</h2>
              <ul>
                <li className="icon icon-arrow-left">
                  <a className="icon icon-display" href="#">
                    Devices
                  </a>
                  <div className="mp-level">
                    <h2 className="icon icon-display">Devices</h2>
                    <a className="mp-back" href="#">
                      back
                    </a>
                    <ul>
                      <li className="icon icon-arrow-left">
                        <a className="icon icon-phone" href="#">
                          Mobile Phones
                        </a>
                        <div className="mp-level">
                          <h2>Mobile Phones</h2>
                          <a className="mp-back" href="#">
                            back
                          </a>
                          <ul>
                            <li>
                              <a href="#">Super Smart Phone</a>
                            </li>
                            <li>
                              <a href="#">Thin Magic Mobile</a>
                            </li>
                            <li>
                              <a href="#">Performance Crusher</a>
                            </li>
                            <li>
                              <a href="#">Futuristic Experience</a>
                            </li>
                          </ul>
                        </div>
                      </li>
                      <li className="icon icon-arrow-left">
                        <a className="icon icon-tv" href="#">
                          Televisions
                        </a>
                        <div className="mp-level">
                          <h2>Televisions</h2>
                          <a className="mp-back" href="#">
                            back
                          </a>
                          <ul>
                            <li>
                              <a href="#">Flat Superscreen</a>
                            </li>
                            <li>
                              <a href="#">Gigantic LED</a>
                            </li>
                            <li>
                              <a href="#">Power Eater</a>
                            </li>
                            <li>
                              <a href="#">3D Experience</a>
                            </li>
                            <li>
                              <a href="#">Classic Comfort</a>
                            </li>
                          </ul>
                        </div>
                      </li>
                      <li className="icon icon-arrow-left">
                        <a className="icon icon-camera" href="#">
                          Cameras
                        </a>
                        <div className="mp-level">
                          <h2>Cameras</h2>
                          <a className="mp-back" href="#">
                            back
                          </a>
                          <ul>
                            <li>
                              <a href="#">Smart Shot</a>
                            </li>
                            <li>
                              <a href="#">Power Shooter</a>
                            </li>
                            <li>
                              <a href="#">Easy Photo Maker</a>
                            </li>
                            <li>
                              <a href="#">Super Pixel</a>
                            </li>
                          </ul>
                        </div>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="icon icon-arrow-left">
                  <a className="icon icon-news" href="#">
                    Magazines
                  </a>
                  <div className="mp-level">
                    <h2 className="icon icon-news">Magazines</h2>
                    <a className="mp-back" href="#">
                      back
                    </a>
                    <ul>
                      <li>
                        <a href="#">National Geographic</a>
                      </li>
                      <li>
                        <a href="#">Scientific American</a>
                      </li>
                      <li>
                        <a href="#">The Spectator</a>
                      </li>
                      <li>
                        <a href="#">The Rambler</a>
                      </li>
                      <li>
                        <a href="#">Physics World</a>
                      </li>
                      <li>
                        <a href="#">The New Scientist</a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="icon icon-arrow-left">
                  <a className="icon icon-shop" href="#">
                    Store
                  </a>
                  <div className="mp-level">
                    <h2 className="icon icon-shop">Store</h2>
                    <a className="mp-back" href="#">
                      back
                    </a>
                    <ul>
                      <li className="icon icon-arrow-left">
                        <a className="icon icon-t-shirt" href="#">
                          Clothes
                        </a>
                        <div className="mp-level">
                          <h2 className="icon icon-t-shirt">Clothes</h2>
                          <a className="mp-back" href="#">
                            back
                          </a>
                          <ul>
                            <li className="icon icon-arrow-left">
                              <a className="icon icon-female" href="#">
                                Women's Clothing
                              </a>
                              <div className="mp-level">
                                <h2 className="icon icon-female">
                                  Women's Clothing
                                </h2>
                                <a className="mp-back" href="#">
                                  back
                                </a>
                                <ul>
                                  <li>
                                    <a href="#">Tops</a>
                                  </li>
                                  <li>
                                    <a href="#">Dresses</a>
                                  </li>
                                  <li>
                                    <a href="#">Trousers</a>
                                  </li>
                                  <li>
                                    <a href="#">Shoes</a>
                                  </li>
                                  <li>
                                    <a href="#">Sale</a>
                                  </li>
                                </ul>
                              </div>
                            </li>
                            <li className="icon icon-arrow-left">
                              <a className="icon icon-male" href="#">
                                Men's Clothing
                              </a>
                              <div className="mp-level">
                                <h2 className="icon icon-male">
                                  Men's Clothing
                                </h2>
                                <a className="mp-back" href="#">
                                  back
                                </a>
                                <ul>
                                  <li>
                                    <a href="#">Shirts</a>
                                  </li>
                                  <li>
                                    <a href="#">Trousers</a>
                                  </li>
                                  <li>
                                    <a href="#">Shoes</a>
                                  </li>
                                  <li>
                                    <a href="#">Sale</a>
                                  </li>
                                </ul>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </li>
                      <li>
                        <a className="icon icon-diamond" href="#">
                          Jewelry
                        </a>
                      </li>
                      <li>
                        <a className="icon icon-music" href="#">
                          Music
                        </a>
                      </li>
                      <li>
                        <a className="icon icon-food" href="#">
                          Grocery
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li>
                  <a className="icon icon-photo" href="#">
                    Collections
                  </a>
                </li>
                <li>
                  <a className="icon icon-wallet" href="#">
                    Credits
                  </a>
                </li>
              </ul>
            </div>
          </nav>

          <div className="scroller">
            <p>
              <a href="#" id="trigger" className="menu-trigger">
                Open/Close Menu
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default hot(module)(TopMenuBarMobile);

/* @flow */

import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { hot } from 'react-hot-loader';

type State = {
  data: String
};

class TopMenuBar extends PureComponent<State> {
  state = {
    data: 'Home'
  };

  render() {
    const { data } = this.state;

    return (
      <div className="container">
        <div className="main">
          <nav className="cbp-hsmenu-wrapper" id="cbp-hsmenu-wrapper">
            <div className="cbp-hsinner">
              <ul className="cbp-hsmenu">
                <li>
                  <a href="#">Lovely Spirits</a>
                  <ul className="cbp-hssubmenu">
                    <li>
                      <a href="#">
                        <img src="images/1.png" alt="img01" />
                        <span>Delicate Wine</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <img src="images/2.png" alt="img02" />
                        <span>Fine Spirit</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <img src="images/3.png" alt="img03" />
                        <span>Heavenly Ale</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <img src="images/4.png" alt="img04" />
                        <span>Juicy Lemonade</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <img src="images/5.png" alt="img05" />
                        <span>Wise Whiskey</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <img src="images/6.png" alt="img06" />
                        <span>Sweet Rum</span>
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="#">Delicious Beverages</a>
                  <ul className="cbp-hssubmenu cbp-hssub-rows">
                    <li>
                      <a href="#">
                        <img src="images/7.png" alt="img07" />
                        <span>Lovely Slurp</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <img src="images/8.png" alt="img08" />
                        <span>Lemony Grappa</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <img src="images/9.png" alt="img09" />
                        <span>Eggy Liquor</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <img src="images/10.png" alt="img10" />
                        <span>Fresh Juice</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <img src="images/1.png" alt="img01" />
                        <span>Delicate Wine</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <img src="images/2.png" alt="img02" />
                        <span>Fine Spirit</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <img src="images/3.png" alt="img03" />
                        <span>Heavenly Ale</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <img src="images/4.png" alt="img04" />
                        <span>Juicy Lemonade</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <img src="images/5.png" alt="img05" />
                        <span>Wise Whiskey</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <img src="images/6.png" alt="img06" />
                        <span>Sweet Rum</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <img src="images/1.png" alt="img01" />
                        <span>Delicate Wine</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <img src="images/2.png" alt="img02" />
                        <span>Fine Spirit</span>
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="#">Fine Liquors</a>
                  <ul className="cbp-hssubmenu">
                    <li>
                      <a href="#">
                        <img src="images/10.png" alt="img10" />
                        <span>Fresh Juice</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <img src="images/6.png" alt="img06" />
                        <span>Sweet Rum</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <img src="images/9.png" alt="img09" />
                        <span>Eggy Liquor</span>
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="#">Our Mission</a>
                </li>
                <li>
                  <a href="#">Contact</a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    );
  }
}

export default hot(module)(TopMenuBar);

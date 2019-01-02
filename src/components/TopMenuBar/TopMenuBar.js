/* @flow */

import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import { Icon } from 'antd';
import SearchBox from '../SearchBox/SearchBox';
import Woman from '../Woman/Woman';
import logo from '../../theme/pic.png';

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
        <div className="headerTop">
          <div className="logoMeno">
            <img src={logo} className="imageLogo" />
          </div>
          <SearchBox />
          <div className="regesteri">
            <li>
              <span>ثبت نام</span>
              <span>/</span>
              <span>ورود</span>{' '}
            </li>
            <li>
              <span>سبد خرید</span>
              <span>
                <Icon type="shopping" />
              </span>
            </li>
          </div>
        </div>
        <div className="main">
          <nav className="cbp-hsmenu-wrapper" id="cbp-hsmenu-wrapper">
            <div className="cbp-hsinner">
              <ul className="cbp-hsmenu">
                <Woman />
                <li>
                  <Link to="">مردانه</Link>
                  <ul className="cbp-hssubmenu">
                    <li>
                      <Link to="">
                        <span>Lovely Slurp</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="">
                        <span>Lemony Grappa</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="">
                        <span>Eggy Liquor</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="">
                        <span>Fresh Juice</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="">
                        <span>Delicate Wine</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="">
                        <span>Fine Spirit</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="">
                        <span>Heavenly Ale</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="">
                        <span>Juicy Lemonade</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="">
                        <span>Wise Whiskey</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="">
                        <span>Sweet Rum</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="">
                        <span>Delicate Wine</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="">
                        <span>Fine Spirit</span>
                      </Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link to="">بچگانه</Link>
                  <ul className="cbp-hssubmenu">
                    <li>
                      <Link to="">
                        <span>Fresh Juice</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="">
                        <span>Sweet Rum</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="">
                        <span>Eggy Liquor</span>
                      </Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link to="">ورزشی</Link>
                  <ul className="cbp-hssubmenu">
                    <li>
                      <Link to="">
                        <span>Fresh Juicsdfsdfe</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="">
                        <span>Sweet sdfdsRum</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="">
                        <span>Eggy Lisdsdfsquor</span>
                      </Link>
                    </li>
                  </ul>
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

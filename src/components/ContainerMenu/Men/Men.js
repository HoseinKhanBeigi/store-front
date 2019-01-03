/* @flow */

import React from 'react';
import { Link } from 'react-router-dom';
import { hot } from 'react-hot-loader';

type Props = { route: Object };

const Men = ({ route }: Props) => (
  <li>
    <Link to="">مردانه</Link>
    <ul className="cbp-hssubmenu">
      <div>
        <div className="first-childDiv">
          <li>
            <Link to="">
              <span className="first-child">کاپشن، پالتو و بارانی</span>
            </Link>
          </li>
        </div>
        <li>
          <Link to="">ژاکت و پلیور</Link>
        </li>
        <li>
          <Link to="">Heavenly Ale</Link>
        </li>
        <li>
          <Link to="">Juicy Lemonade</Link>
        </li>
        <li>
          <Link to="">Wise Whiskey</Link>
        </li>
        <li>
          <Link to="">Sweet Rum</Link>
        </li>
      </div>
    </ul>
  </li>
);

export default hot(module)(Men);

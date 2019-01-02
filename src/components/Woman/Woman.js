/* @flow */

import React from 'react';
import { Link } from 'react-router-dom';
import { hot } from 'react-hot-loader';

type Props = { route: Object };

const Woman = ({ route }: Props) => (
  <li>
    <Link to="">زنانه</Link>
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
          <Link to="">
            <span>ژاکت و پلیور</span>
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
      </div>
    </ul>
  </li>
);

export default hot(module)(Woman);

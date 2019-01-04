/* @flow */

import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';
import { hot } from 'react-hot-loader';

type Props = { route: Object };

const Regesteri = ({ route }: Props) => (
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
);

export default hot(module)(Regesteri);

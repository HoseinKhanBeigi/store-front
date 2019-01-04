/* @flow */

import React from 'react';
import { renderRoutes } from 'react-router-config';
import { hot } from 'react-hot-loader';
import { TopMenuBar, Footer } from '../../components/index';

type Props = { route: Object };

const BaseRouter = ({ route }: Props) => (
  <div>
    <TopMenuBar />
    {renderRoutes(route.routes)}
    <Footer />
  </div>
);

export default hot(module)(BaseRouter);

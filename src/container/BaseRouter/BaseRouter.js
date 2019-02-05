/* @flow */

import React from "react";
import { renderRoutes } from "react-router-config";
import { hot } from "react-hot-loader";

type Props = { route: Object };

const BaseRouter = ({ route }: Props) => (
  <div>{renderRoutes(route.routes)}</div>
);

export default hot(module)(BaseRouter);

/* @flow */

import React from 'react';
import { renderRoutes } from 'react-router-config';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { hot } from 'react-hot-loader';
// import { getSize } from '../../actions/getSize';
import { TopMenuBar, Footer } from '../../components/index';

type Props = { route: Object };

const BaseRouter = ({ route }: Props) => (
  <div>
    <TopMenuBar />
    {renderRoutes(route.routes)}
    <Footer />
  </div>
);

const mapDispatchToProps = dispatch => ({
  // getSize: () => dispatch(getSize())
});

export default compose(
  withRouter,
  connect(mapDispatchToProps)
)(BaseRouter);

// export default hot(module)(BaseRouter);

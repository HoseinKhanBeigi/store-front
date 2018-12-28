/* @flow */

import Loadable from 'react-loadable';

import { Loading } from '../../components';

export default Loadable({
  loader: () => import('./BaseRouter'),
  loading: Loading
});

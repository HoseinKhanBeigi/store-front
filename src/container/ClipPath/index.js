/* @flow */

import Loadable from 'react-loadable';

import { Loading } from '../../components';

export default Loadable({
  loader: () => import('./ClipPath'),
  loading: Loading
});

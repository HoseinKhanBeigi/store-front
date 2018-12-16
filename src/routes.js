/* @flow */

import { usersAction } from './actions';
import App from './app';
import { StoreGallery, NotFound } from './container';

export default [
  {
    component: App,
    routes: [
      {
        path: '/',
        exact: true,
        component: StoreGallery, // Add your route here
        loadData: () => [
          usersAction.fetchUsersIfNeeded()
          // Add other pre-fetched actions here
        ]
      },
      {
        component: NotFound
      }
    ]
  }
];

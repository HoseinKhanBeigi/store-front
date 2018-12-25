/* @flow */

import { usersAction } from './actions';
// import App from './app';
import { Header, Home, StoreGallery, NotFound } from './container';

export default [
  {
    component: Header,
    routes: [
      {
        path: '/',
        exact: true,
        component: Home, // Add your route here
        loadData: () => [
          usersAction.fetchUsersIfNeeded()
          // Add other pre-fetched actions here
        ]
      },
      {
        path: '/storegallery',
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

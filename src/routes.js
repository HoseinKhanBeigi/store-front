/* @flow */
import { BaseRouter, Home, StoreGallery, NotFound } from './container';

export default [
  {
    component: BaseRouter,
    routes: [
      {
        path: '/',
        exact: true,
        component: Home // Add your route here
      },
      {
        path: '/storegallery',
        exact: true,
        component: StoreGallery // Add your route here
      },
      {
        component: NotFound
      }
    ]
  }
];

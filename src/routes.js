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
        path: '/men',
        exact: true,
        component: StoreGallery // Add your route here
      },
      {
        path: '/woman',
        exact: true,
        component: StoreGallery // Add your route here
      },
      {
        path: '/sport',
        exact: true,
        component: StoreGallery // Add your route here
      },
      {
        path: '/kids',
        exact: true,
        component: StoreGallery // Add your route here
      },
      {
        path: '/:string-:string',
        exact: true,
        component: StoreGallery // Add your route here
      },
      {
        component: NotFound
      }
    ]
  }
];

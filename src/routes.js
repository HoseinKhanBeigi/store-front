/* @flow */
import {
  BaseRouter,
  Home,
  StoreGallery,
  NotFound,
  Product,
  Men
} from './container';

export default [
  {
    component: BaseRouter,
    routes: [
      {
        path: '/',
        exact: true,
        component: Home
      },
      {
        path: '/men',
        exact: true,
        component: Men
      },
      {
        path: '/woman',
        exact: true,
        component: StoreGallery
      },
      {
        path: '/sport',
        exact: true,
        component: StoreGallery
      },
      {
        path: '/kids',
        exact: true,
        component: StoreGallery
      },
      {
        path: '/:string-:string',
        exact: true,
        component: StoreGallery
      },
      {
        path: '/product',
        exact: true,
        component: Product
      },
      {
        component: NotFound
      }
    ]
  }
];

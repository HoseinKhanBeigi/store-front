/* @flow */
import {
  BaseRouter,
  Home,
  StoreGallery,
  NotFound,
  Product,
  ClipPath
} from "./container";

export default [
  {
    component: BaseRouter,
    routes: [
      {
        path: "/",
        exact: true,
        component: Home
      },
      {
        path: "/ClipPath",
        exact: true,
        component: ClipPath
      },
      {
        path: "/product",
        exact: true,
        component: Product
      },
      {
        component: NotFound
      }
    ]
  }
];

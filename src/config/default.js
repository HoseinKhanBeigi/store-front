/* @flow */

module.exports = {
  host: process.env.NODE_HOST || '192.168.1.4', // Define your host from 'package.json'
  port: process.env.PORT,
  app: {
    htmlAttributes: { lang: 'en' },
    title: 'Store front',
    titleTemplate: 'Store front - %s',
    meta: [
      {
        name: 'description',
        content: 'The best react universal starter boilerplate in the world.'
      }
    ]
  }
};

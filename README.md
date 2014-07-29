# react-quickstart

This project was initially forked from [here](https://github.com/andreypopp/react-quickstart) and it's inpired on [derbyjs][]'s value proposition.

### Goals

1. Make something valuable for humans building web things.

### Features

A React project template which combines:

  * [react-router-component][] to provide HTML5 History routing and navigation

  * [react-async][] to create "asynchronous" React components

  * [preprocess][] to assist building process and client/server code reusability (not yet implemented)

  * [express][] to serve pre-rendered React components, assets and provide API

  * [webpack][] to provide module system for a browser

  * [cortex][] to provide data/state modularity

  * [gulp][] to provide task streaming

  * [flux][] to provide a design pattern for client code

  * [npm][] to install and manage server-side and client-side dependencies

Every "page" in the application is **pre-rendered on server** so the user can
see the UI before the client code is shipped to a browser. After that
application starts functioning like a **single page application**, navigating
between "pages" without reloads.

Preprocessing allows stores to call a different implementation on the server, increasing reusability.

## Project structure

Project structure is growing up (showing dirs only):

    .
    ├── build
    │       ├── assets
    │       └── server
    └── src
        └── js
            └── server
                ├── api
                ├── client
                │   ├── components
                │   │   ├── app
                │   │   ├── main-page
                │   │   ├── mixins
                │   │   ├── not-found-page
                │   │   ├── sign-in-page
                │   │   ├── sign-up-page
                │   │   └── user-page
                │   ├── dispatcher
                │   ├── helpers
                │   └── model
                └── middleware


Directory `assets` is served under `/assets` URL, `client.js` module contains UI
code while `server.js` — HTTP server which serves pre-rendered React components,
assets and provide a stub for a REST API.

## Development workflow

After cloning a git repo, run:

    % npm install

to install all needed dependencies and then:

    % gulp
    % npm start

to start a development server.

## Going "production"

To build an optimized bundle of client code run:

    % npm run build

which will compile the code for production mode

    % npm start

to start server in "production" mode (no source code watching and serving
optimized bundle to browser).

[react-router-component]: http://andreypopp.viewdocs.io/react-router-component
[react-async]: http://andreypopp.viewdocs.io/react-async
[express]: expressjs.com
[npm]: https://www.npmjs.org/
[browserify]: http://browserify.org/
[preprocess]: http://github.com/jsoverson/preprocess
[webpack]: http://webpack.github.io/
[gulp]: http://gulpjs.com/
[derbyjs]: http://derbyjs.com/
[cortex]: https://github.com/mquan/cortex
[flux]: http://facebook.github.io/react/docs/flux-overview.html

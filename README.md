# Web Component Template Project

A starting point for a Web Components based front end.

Web Components are native to the browser and require no building or processing.

This project implements a simple web server for hot reloading and quick developement. It also has a build script (although not required) that bundles the source files togehter, minifies, and adds polyfills for older browsers using [ESBuild](https://esbuild.github.io/).

## Getting Started

### Setup

The web component source files define HTML and CSS in Javascript templates, in order to get syntax highlighting in these templates I use the VSCode extension [es6-string-html](https://marketplace.visualstudio.com/items?itemName=Tobermory.es6-string-html) which allows you to define what syntax you want highlighted in a given template like so:

```javascript
const html = /* html */`
  <style>
    button {
      border: none;
    }
  </style>
  <button>Hello world!</button>
`;
```

### Install

From the root run:

```bash
yarn install
```

### Develop

To start the dev server run:

```bash
yarn start
```

This will launch your app at `http://localhost:8000` and hot reload the files whenever you make a change.

### Deploy

To bundle the files for deployment run:
```bash 
yarn build
```

Then deploy the `/build` folder to your webserver.
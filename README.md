# console.history
[![npm](https://img.shields.io/npm/v/console.history.svg)]()
[![GitHub release](https://img.shields.io/github/release/lesander/console.history.svg?maxAge=2592000)]()
[![npm](https://img.shields.io/npm/dt/console.history.svg)]()
[![Code Climate](https://codeclimate.com/github/lesander/console.history/badges/gpa.svg)](https://codeclimate.com/github/lesander/console.history)
[![BCH compliancy](https://bettercodehub.com/edge/badge/lesander/console.history)](https://bettercodehub.com)
[![Build Status](https://travis-ci.org/lesander/console.history.svg?branch=master)](https://travis-ci.org/lesander/console.history)


A very small library to store all console logs in `console.history`.

### Usage
Include `console-history.js` or `console-history.min.js` in your page or script before any console function gets called. All calls to `console.log`, `console.info`, `console.warn`, `console.error` and `console.debug` will be intercepted and stored after doing so. *Including every parameter passed to those functions.*

### Getting Started
This library works in almost all browsers and on any NodeJS server.

#### Browser
You can [download the latest release](https://github.com/lesander/console.history/releases/latest) on GitHub, or use RawGit's CDN to get the latest version directly in your browser:
```html
<script src="https://cdn.rawgit.com/lesander/console.history/v1.4.0/console-history.min.js"></script>
```
See an example entry to the history array below. This example is from the [`test/test.js`](test/test.js) file.
```json
{
  "type": "warn",
  "timestamp": "Thu, 01 Sep 2016 15:38:28 GMT",
  "arguments": {
    "0": "Something went wrong, but we're okay!"
  },
  "stack": {
    "0": "at inner (http://localhost:1337/test/test.js:6:11)",
    "1": "at outer (http://localhost:1337/test/test.js:2:3)",
    "2": "at http://localhost:1337/test/test.js:9:1"
  }
}
```

#### Server (NodeJS)
Fetch the latest version of `console.history`:
```shell
npm install console.history
```
```js
require('console.history')
console.log('Hello World!')
```
At this point, the `console.history` array is populated with one entry:
```js
[
  {
    type: 'log',
    timestamp: 'Thu, 16 Mar 2017 17:24:25 GMT',
    arguments: { '0': 'Hello World!' },
    stack: [
      'at Console.console._intercept (/.../console.history/test/node.js:4:11)',
      'at Object.<anonymous> (/.../console.history/test/node.js:6:9)',
      'at Module._compile (module.js:571:32)',
      'at Object.Module._extensions..js (module.js:580:10)',
      'at Module.load (module.js:488:32)',
      'at tryModuleLoad (module.js:447:12)',
      'at Function.Module._load (module.js:439:3)',
      'at Module.runMain (module.js:605:10)'
    ]
  }
]
```

#### Intercepting the log function
You can add your own middleware to `console.history` with the function `console._intercept(type, args)`. This can prove useful when you need to access a new log entry before or after it gets logged and added to the history array. See an example below.

```js
console._intercept = function (type, args) {

  if (type === 'error') {
    // send the error to your server or do something else..
  }

  // pass the log intent to the collector.
  console._collect(type, args)
}

```

#### Limitations

Every saved console log is stored locally in the array `console.history`. A page reload will erase all history, as the array is not permanently stored. You could use `localStorage` or `sessionStorage` for that.

### How it works
This script is basically a man-in-the-middle for all `console[log/info/warn/error/debug]` functions. Every call gets intercepted, printed and added to the history array.

![](test/diagram.png)

The code is not that hard to understand, see [`console-history.js`](/console-history.js) with in-line comments explaining the code.

### Contributing
If you'd like to contribute to console.history, or file a bug or feature request, please head over to the issue tracker or open a pull request.

Testing browser-side is as easy as running [`jekyll serve`](https://jekyllrb.com) in the project's directory, navigating to `localhost:4000/test` in your browser and opening [DevTools](https://developer.chrome.com/devtools).
```shell
git clone https://github.com/lesander/console.history.git
cd console.history
jekyll serve
```

### License
This software is open-sourced under the MIT License ([see the LICENSE file for the full license](/LICENSE)). So within some limits, you can do with the code whatever you want. However, if you like and/or want to re-use it, I'd really appreciate a reference to this project page.

The software is provided as is. It might work as expected - or not.
Just don't blame me.

# console.history [![Build Status](https://travis-ci.org/lesander/console-history.svg?branch=master)](https://travis-ci.org/lesander/console-history)
:scroll:
A very small library to store all console logs in `console.history`.

[Download v1.3.0](https://github.com/lesander/console-history/releases/latest)

### Usage
Include `console-history.js` or `console-history.min.js` in your page before any
console function gets called. All calls to `console.log`, `console.info`,
`console.warn`, `console.error` and `console.debug` will be intercepted and
stored after that. Including every parameter passed to those functions.

### Getting Started
You can [download the latest release](https://github.com/lesander/console-history/releases/latest)
on GitHub, or use RawGit's CDN to get the latest version directly in your browser:
```html
<script src="https://cdn.rawgit.com/lesander/console-history/v1.3.0/console-history.min.js"></script>
```


Every saved console log is stored locally in the array `console.history`.
A page reload will erase all history, it is not permanently stored. You could use
`localStorage` or `sessionStorage` for that.

See an example entry to the history array below.
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

### How it works
This script is basically a man-in-the-middle for all `console[log/info/warn/error/debug]` functions.
Every call gets intercepted and added to the history array. The code is not that hard to
understand, see `console-history.js` with in-line comments explaining the code [here](/console-history.js).

### Contributing
If you'd like to contribute to console.history, or file a bug or feature request,
please head over to the issue tracker or open a pull request.

Testing is as easy as running [`jekyll serve`](https://jekyllrb.com) in the project's directory,
navigating to `localhost:4000/test` in your browser and opening [DevTools](https://developer.chrome.com/devtools).
```shell
git clone https://github.com/lesander/console-history.git
cd console-history
jekyll serve
```

### License
This software is open-sourced under the MIT License ([see the LICENSE file for
the full license](/LICENSE)). So within some limits, you can do with the code whatever
you want. However, if you like and/or want to re-use it, I'd really appreciate
a reference to this project page.

The software is provided as is. It might work as expected - or not.
Just don't blame me.

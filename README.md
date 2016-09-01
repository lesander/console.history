# console.history
A very small library to store all console logs in `console.history`.

[Download v1.0.0](https://github.com/lesander/console-history/archive/master.zip)

### Usage
Include `console-history.js` or `console-history.min.js` in your page before any
console function gets called. All calls to `console.log`, `console.info`,
`console.warn`, `console.error` and `console.debug` will be intercepted and
stored after that. Including every parameter passed to those functions.

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


### License
This software is open-sourced under the MIT License (see the LICENSE file for
the full license). So within some limits, you can do with the code whatever
you want. However, if you like and/or want to re-use it, I'd really appreciate
a reference to this project page.

The software is provided as is. It might work as expected - or not.
Just don't blame me.

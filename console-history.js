/**
 * Console History v1.0.1
 * console-history.js
 *
 * Licensed under the MIT License.
 *
 * Written by Sander Laarhoven <sander@laarhoven.org>
 * For Doorbell.io <3
 * https://github.com/lesander/console-history
 * https://sander.tech - https://doorbell.io
 */

/* Alert all watching developers that we are intercepting the
   original console log functions. */
console.log("** All console logging functions on this page are intercepted and \
locally stored at `console.history` **\nCall the original, un-modified, log \
functions with `console._log`, `console._warn` and so on.");

/* Store the original log functions. */
console._log = console.log;
console._info = console.info;
console._warn = console.warn;
console._error = console.error;
console._debug = console.debug;

/* Declare our console history variable. */
console.history = [];

/* Redirect all calls to the collector. */
console.log = function() { return console._collect("log", arguments); }
console.info = function() { return console._collect("info", arguments); }
console.warn = function() { return console._collect("warn", arguments); }
console.error = function() { return console._collect("error", arguments); }
console.debug = function() { return console._collect("debug", arguments); }

/* Define the main log catcher. */
console._collect = function(type, args) {

  // WARNING: When debugging this function, DO NOT call a modified console.log
  // function, all hell will break loose.
  // Instead use the original console._log functions.

  // All the arguments passed to any function, even when not defined
  // inside the function declaration, are stored and locally available in
  // the variable called 'arguments'.
  //
  // The arguments of the original console.log functions are collected above,
  // and passed to this function as a variable 'args', since 'arguments' is
  // reserved for the current function.
  args; arguments;

  // Collect the timestamp of the console log.
  var time = new Date().toUTCString();

  // Make sure the 'type' parameter is set. If no type is set, we fall
  // back to the default log type.
  if (!type) { var type = "log"; }

  // To ensure we behave like the original console log functions, we do not
  // output anything if no arguments are provided.
  if (!args || args.length === 0) { return; }

  // Act normal, and just pass all original arguments to
  // the origial console function :)
  console["_"+type].apply(console, args);

  // Get stack trace information. By throwing an error, we get access to
  // a stack trace. We then go up in the trace tree and filter out
  // irrelevant information.
  var stack = false;
  try { throw Error(""); } catch(error) {

    // The lines containing 'console-history.js' are not relevant to us.
    var stackParts = error.stack.split("\n");
    var stack = [];
    for (var i = 0; i < stackParts.length; i++) {
      if (stackParts[i].indexOf("console-history.js") > -1) continue;
      stack.push(stackParts[i].trim());
    }

  }

  // Add the log to our history.
  console.history.push({type: type, timestamp: time, arguments: args, stack: stack});

}

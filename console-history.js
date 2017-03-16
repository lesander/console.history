/**
 * Console History v1.5.0
 * console-history.js
 *
 * Licensed under the MIT License.
 *
 * Written by Sander Laarhoven <sander@laarhoven.org>
 * For Doorbell.io <3
 * https://git.io/console
 * https://sander.tech - https://doorbell.io
 */

'use strict'

/* Allow only one instance of console-history.js */
if (typeof console.history !== 'undefined') {
  throw new Error('Only one instance of console-history.js can run at a time.')
}

/* Store the original log functions. */
console._log = console.log
console._info = console.info
console._warn = console.warn
console._error = console.error
console._debug = console.debug

/* Declare our console history variable. */
console.history = []

/* Redirect all calls to the collector. */
console.log = function () { return console._intercept('log', arguments) }
console.info = function () { return console._intercept('info', arguments) }
console.warn = function () { return console._intercept('warn', arguments) }
console.error = function () { return console._intercept('error', arguments) }
console.debug = function () { return console._intercept('debug', arguments) }

/* Give the developer the ability to intercept the message before letting
   console-history access it. */
console._intercept = function (type, args) {
  // Your own code can go here, but the preferred method is to override this
  // function in your own script, and add the line below to the end or
  // begin of your own 'console._intercept' function.
  // REMEMBER: Use only underscore console commands inside _intercept!
  console._collect(type, args)
}

/* Define the main log catcher. */
console._collect = function (type, args) {
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

  // Collect the timestamp of the console log.
  var time = new Date().toUTCString()

  // Make sure the 'type' parameter is set. If no type is set, we fall
  // back to the default log type.
  if (!type) type = 'log'

  // To ensure we behave like the original console log functions, we do not
  // output anything if no arguments are provided.
  if (!args || args.length === 0) return

  // Act normal, and just pass all original arguments to
  // the origial console function :)
  console['_' + type].apply(console, args)

  // Get stack trace information. By throwing an error, we get access to
  // a stack trace. We then go up in the trace tree and filter out
  // irrelevant information.
  var stack = false
  try { throw Error('') } catch (error) {
    // The lines containing 'console-history.js' are not relevant to us.
    var stackParts = error.stack.split('\n')
    stack = []
    for (var i = 0; i < stackParts.length; i++) {
      if (stackParts[i].indexOf('console-history.js') > -1 ||
      stackParts[i].indexOf('console-history.min.js') > -1 ||
      stackParts[i] === 'Error') {
        continue
      }
      stack.push(stackParts[i].trim())
    }
  }

  // Add the log to our history.
  console.history.push({type: type, timestamp: time, arguments: args, stack: stack})
}

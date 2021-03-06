(function() {
  var suppress = 0;

  // replacement for console.log. This is a temporary API. We should
  // provide a real logging API soon (possibly just a polyfill for
  // console?)
  //
  // NOTE: this is used on the server to print the warning about
  // having autopublish enabled when you probably meant to turn it
  // off. it's not really the proper use of something called
  // _debug. the intent is for this message to go to the terminal and
  // be very visible. if you change _debug to go someplace else, etc,
  // please fix the autopublish code to do something reasonable.
  Meteor._debug = function (/* arguments */) {
    if (suppress) {
      suppress--;
      return;
    }
    if (typeof console !== 'undefined' &&
        typeof console.log !== 'undefined') {
      if (arguments.length == 0) { // IE Companion breaks otherwise
        // IE10 PP4 requires at least one argument
        console.log('');
      } else {
        // IE doesn't have console.log.apply, it's not a real Object.
        // http://stackoverflow.com/questions/5538972/console-log-apply-not-working-in-ie9
        // http://patik.com/blog/complete-cross-browser-console-log/
        if (typeof console.log.apply === "function") {
          // Most browsers
          // console.log.apply(console, arguments);
          console.log.apply(console, [">BEGIN>LOG>>>>>>>>>>>>>>>>>>>>>>"]);
          for(var key in arguments) {
            console.log.apply(console, ["----"]);
            if(typeof arguments[key] === "string") {
              console.log.apply(console, [arguments[key].replace(/\n/g, '\n----\n').replace(/@/g, '\n@')]);
            } else {
              console.log.apply(console, [arguments[key]]);
            }
          }
          // console.log.apply(console, ["----"]);
          console.log.apply(console, ["<END<LOG<<<<<<<<<<<<<<<<<<<<<<<<"]);
        } else if (typeof Function.prototype.bind === "function") {
          // IE9
          var log = Function.prototype.bind.call(console.log, console);
          log.apply(console, arguments);
        } else {
          // IE8
          Function.prototype.call.call(console.log, console, Array.prototype.slice.call(arguments));
        }
      }
    }
  };

  // Suppress the next 'count' Meteor._debug messsages. Use this to
  // stop tests from spamming the console.
  Meteor._suppress_log = function (count) {
    suppress += count;
  };
})();

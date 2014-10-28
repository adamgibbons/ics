var fs = require('fs');
var path = require('path');

var CalEvent = require('./lib/cal-event.js');
var TMPDIR = require('os').tmpdir();

function _writeToFile(options, filepath, cb) {
  var dest;
  var options = options || {};
  var cal = new CalEvent(options);
  var data = cal.getEvent();

  if (filepath) {
    dest = path.join(filepath);
  } else if (options.filename) {
    dest = path.join(TMPDIR, options.filename);
  } else {
    dest = path.join(TMPDIR, 'calendar-event.ics');
  }

  fs.writeFile(dest, data, function(err) {
    if (err) return cb(err);
    return cb(null, dest);
  });
}

module.exports = {
  createEvent: _writeToFile
}

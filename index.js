var CalEvent = require('./lib/cal-event.js');
var fs = require('fs');
var path = require('path');

function _writeToFile(options, filepath, cb) {
  var options = this.options || {};
  var cal = new CalEvent(options);
  var data = cal.getEvent();
  var dest = filepath ? path.join(filepath) : path.join(__dirname, 'test-event.ics');

  fs.writeFile(path.join(dest), data, function(err) {
    if (cb) {
      if (err) return cb(err);
      return cb(null, dest);
    }

    if (err) throw err;
    return dest;
  });
}

module.exports = {
  write: _writeToFile
}

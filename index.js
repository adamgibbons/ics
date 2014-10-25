var CalEvent = require('./lib/cal-event.js');
var fs = require('fs');
var path = require('path');

module.exports = function (options) {
  var options = this.options || {};
  var cal = new CalEvent(options);
  var data = cal.getEvent();

  fs.writeFile(path.join(__dirname, 'test-event.ics'), data, function(err, success) {
    if (err) throw err;
    console.log("Success!");
  });
}

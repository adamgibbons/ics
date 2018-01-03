'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateEvent = generateEvent;
exports.createEvent = createEvent;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _pipeline = require('./pipeline');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function generateEvent(attributes, cb) {
  var err = null;

  var _validateEvent = (0, _pipeline.validateEvent)((0, _pipeline.buildEvent)(attributes)),
      error = _validateEvent.error,
      value = _validateEvent.value;

  if (error && !cb) return { error: error, value: value };
  if (error) return cb(error);
  var event = '';
  try {
    event = (0, _pipeline.formatEvent)(value);
  } catch (error) {
    err = error;
  }
  if (!cb) return { error: err, value: event
    // Return a node-style callback
  };return cb(err, event);
}
function createEvent(data, productId, cb) {
  var formatedEvents = "";
  var events = [];
  if (!data || !productId) Error('attributes & productId is required');
  if (_lodash2.default.isObject(data) && !_lodash2.default.isArray(data)) {
    events.push(data);
  } else {
    events = data;
  }
  try {
    _lodash2.default.forEach(events, function (attributes) {
      if (!attributes) throw Error('attributes argument is required');
      generateEvent(attributes, function (error, val) {
        if (error) throw error;
        formatedEvents += val;
      });
    });
    formatedEvents = (0, _pipeline.formatCalendar)(formatedEvents, productId);
  } catch (error) {
    if (!cb) return { error: error, value: null };
    return cb(error, null);
  }
  if (!cb) return { error: null, value: formatedEvents };
  return cb(null, formatedEvents);
}
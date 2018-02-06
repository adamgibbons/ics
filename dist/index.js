'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateEvent = generateEvent;
exports.createCalendar = createCalendar;
exports.createEvent = createEvent;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _pipeline = require('./pipeline');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function generateEvent(attributes, cb) {
  if (!attributes) throw Error('attributes argument is required');
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

function createCalendar(data, properties, cb) {
  var formatedEvents = "";
  if (!data || !properties) Error('attributes & properties is required');
  var events = _lodash2.default.isArray(data) ? data : [data];
  try {
    _lodash2.default.forEach(events, function (attributes) {
      generateEvent(attributes, function (error, val) {
        if (error) throw error;
        formatedEvents += val;
      });
    });
    formatedEvents = (0, _pipeline.formatCalendar)(formatedEvents, properties);
  } catch (error) {
    if (!cb) return { error: error, value: null };
    return cb(error, null);
  }
  if (!cb) return { error: null, value: formatedEvents };
  return cb(null, formatedEvents);
}

/* For support old version */
function createEvent(data, cb) {
  createCalendar(data, {}, cb);
}
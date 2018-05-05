'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createEvent = createEvent;
exports.createEvents = createEvents;

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

var _pipeline = require('./pipeline');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function assignUniqueId(event) {
  event.uid = event.uid || (0, _v2.default)();
  return (0, _pipeline.validateEvent)((0, _pipeline.buildEvent)(event));
}

function applyInitialFormatting(_ref) {
  var error = _ref.error,
      value = _ref.value;

  if (error) {
    return { error: error, value: null };
  }

  return { error: null, value: (0, _pipeline.formatEvent)(value) };
}

function reformatEventsByPosition(_ref2, idx, list) {
  var error = _ref2.error,
      value = _ref2.value;

  if (error) return { error: error, value: value };

  if (idx === 0) {
    // beginning of list
    return { value: value.slice(0, value.indexOf('END:VCALENDAR')), error: null };
  }

  if (idx === list.length - 1) {
    // end of list
    return { value: value.slice(value.indexOf('BEGIN:VEVENT')), error: null };
  }

  return { error: null, value: value.slice(value.indexOf('BEGIN:VEVENT'), value.indexOf('END:VEVENT') + 12) };
}

function catenateEvents(accumulator, _ref3, idx) {
  var error = _ref3.error,
      value = _ref3.value;

  if (error) {
    accumulator.error = error;
    accumulator.value = null;
    return accumulator;
  }

  if (accumulator.value) {
    accumulator.value = accumulator.value.concat(value);
    return accumulator;
  }

  accumulator.value = value;
  return accumulator;
}

function createEvent(attributes, cb) {
  if (!attributes) {
    Error('Attributes argument is required');
  }

  if (!cb) {
    // No callback, so return error or value in an object
    var _validateEvent = (0, _pipeline.validateEvent)((0, _pipeline.buildEvent)(attributes)),
        _error = _validateEvent.error,
        _value = _validateEvent.value;

    if (_error) return { error: _error, value: _value };

    var event = '';

    try {
      event = (0, _pipeline.formatEvent)(_value);
    } catch (error) {
      return { error: error, value: null };
    }

    return { error: null, value: event };
  }

  // Return a node-style callback

  var _validateEvent2 = (0, _pipeline.validateEvent)((0, _pipeline.buildEvent)(attributes)),
      error = _validateEvent2.error,
      value = _validateEvent2.value;

  if (error) return cb(error);

  return cb(null, (0, _pipeline.formatEvent)(value));
}

function createEvents(events, cb) {
  if (!events) {
    return { error: Error('one argument is required'), value: null };
  }

  var _events$map$map$map$r = events.map(assignUniqueId).map(applyInitialFormatting).map(reformatEventsByPosition).reduce(catenateEvents, { error: null, value: null }),
      error = _events$map$map$map$r.error,
      value = _events$map$map$map$r.value;

  if (!cb) {
    return { error: error, value: value };
  }

  return cb(error, value);
}
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateEvent = generateEvent;
exports.createEvent = createEvent;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _pipeline = require('./pipeline');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function generateEvent(attributes, cb) {
  if (!attributes) {
    Error('attributes argument is required');
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

    return { error: null, value: (0, _pipeline.formatCalendar)(event) };
  }

  // Return a node-style callback

  var _validateEvent2 = (0, _pipeline.validateEvent)((0, _pipeline.buildEvent)(attributes)),
      error = _validateEvent2.error,
      value = _validateEvent2.value;

  if (error) return cb(error);

  return cb(null, (0, _pipeline.formatEvent)(value));
}
function createEvent(data, productId, cb) {
  var formatedEvents = "";
  var events = [];
  if (!data || !productId) {
    Error('attributes & productId is required');
  }
  if (_lodash2.default.isObject(data) && !_lodash2.default.isArray(data)) {
    events.push(data);
  } else {
    events = data;
  }
  _bluebird2.default.each(events, function (attributes) {
    if (!attributes) {
      Error('attributes argument is required');
    }
    return generateEvent(attributes, function (error, val) {
      formatedEvents += val;
    });
  }).then(function (events) {
    return cb(null, (0, _pipeline.formatCalendar)(formatedEvents, productId));
  });
}
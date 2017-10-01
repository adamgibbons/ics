'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createEvent = createEvent;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _pipeline = require('./pipeline');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createEvent(attributes, cb) {
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

    return { error: null, value: event };
  }

  // Return a node-style callback

  var _validateEvent2 = (0, _pipeline.validateEvent)((0, _pipeline.buildEvent)(attributes)),
      error = _validateEvent2.error,
      value = _validateEvent2.value;

  if (error) return cb(error);

  return cb(null, (0, _pipeline.formatEvent)(value));
}
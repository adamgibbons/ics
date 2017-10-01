'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildEvent;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _defaults = require('../defaults');

var _defaults2 = _interopRequireDefault(_defaults);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function buildEvent() {
  var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var title = attributes.title,
      productId = attributes.productId,
      uid = attributes.uid,
      start = attributes.start,
      startType = attributes.startType,
      duration = attributes.duration,
      end = attributes.end,
      description = attributes.description,
      url = attributes.url,
      geo = attributes.geo,
      location = attributes.location,
      status = attributes.status,
      categories = attributes.categories,
      organizer = attributes.organizer,
      attendees = attributes.attendees,
      alarms = attributes.alarms;

  // fill in default values where necessary

  var output = Object.assign({}, _defaults2.default, attributes);

  // remove falsey values
  var cleanOutput = _lodash2.default.pickBy(output, _lodash2.default.identity);

  return cleanOutput;
}
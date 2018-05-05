'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _v = require('uuid/v1');

var _v2 = _interopRequireDefault(_v);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var now = (0, _moment2.default)().utc();

var defaults = {
  title: 'Untitled event',
  productId: 'adamgibbons/ics',
  uid: (0, _v2.default)(),
  timestamp: (0, _utils.setDateWithUTCtime)([now.get('year'), now.get('month') + 1, now.get('date'), now.get('hours'), now.get('minutes'), now.get('seconds')]),
  start: (0, _utils.setDateWithUTCtime)()
};

exports.default = defaults;
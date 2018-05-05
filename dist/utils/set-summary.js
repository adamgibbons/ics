'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = setSummary;

var _formatText = require('./format-text');

var _formatText2 = _interopRequireDefault(_formatText);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function setSummary(summary) {
    return (0, _formatText2.default)(summary);
}
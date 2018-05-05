'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = setDescription;

var _formatText = require('./format-text');

var _formatText2 = _interopRequireDefault(_formatText);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function setDescription(description) {
    return (0, _formatText2.default)(description);
}
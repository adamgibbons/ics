'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = setContact;
function setContact(_ref) {
  var name = _ref.name,
      email = _ref.email,
      rsvp = _ref.rsvp;

  var formattedAttendee = 'CN="';
  formattedAttendee += name || 'Unnamed attendee';
  formattedAttendee += '";';
  formattedAttendee += rsvp ? 'RSVP=TRUE:' : '';
  formattedAttendee += email ? 'mailto:' + email : '';
  
  return formattedAttendee;
}

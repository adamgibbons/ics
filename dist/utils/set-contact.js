'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = setContact;
function setContact(_ref) {
  var name = _ref.name,
      email = _ref.email,
      rsvp = _ref.rsvp;

  var formattedAttendee = '';
  formattedAttendee += rsvp ? 'RSVP=TRUE;' : 'RSVP=FALSE;';
  formattedAttendee += 'CN=';
  formattedAttendee += name || 'Unnamed attendee';
  formattedAttendee += email ? ':mailto:' + email : '';

  return formattedAttendee;
}
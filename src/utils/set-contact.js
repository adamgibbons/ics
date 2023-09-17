import encodeParamValue from "./encode-param-value";

export default function setContact({ name, email, rsvp, dir, partstat, role, cutype, xNumGuests }) {
  let formattedParts = [];

  if(rsvp !== undefined){
    formattedParts.push(rsvp ? 'RSVP=TRUE' : 'RSVP=FALSE');
  }
  if(cutype){
    formattedParts.push("CUTYPE=".concat(encodeParamValue(cutype)));
  }
  if(xNumGuests !== undefined){
    formattedParts.push(`X-NUM-GUESTS=${xNumGuests}`);
  }
  if(role){
    formattedParts.push("ROLE=".concat(encodeParamValue(role)));
  }
  if(partstat){
    formattedParts.push("PARTSTAT=".concat(encodeParamValue(partstat)));
  }
  if(dir){
    formattedParts.push("DIR=".concat(encodeParamValue(dir)));
  }
  formattedParts.push('CN='.concat((encodeParamValue(name || 'Unnamed attendee'))));

  var formattedAttendee = formattedParts.join(';').concat(email ? ":mailto:".concat(email) : '');

  return formattedAttendee
}

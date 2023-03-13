export default function setContact({ name, email, rsvp, dir, partstat, role, cutype, xNumGuests }) {
  let formattedParts = [];

  if(cutype){
    formattedParts.push("CUTYPE=".concat(cutype));
  }
  if(role){
    formattedParts.push("ROLE=".concat(role));
  }
  if(partstat){
    formattedParts.push("PARTSTAT=".concat(partstat));
  }
  if(rsvp){
    formattedParts.push(rsvp ? 'RSVP=TRUE' : 'RSVP=FALSE');
  }
  if(dir){
    formattedParts.push("DIR=".concat(dir));
  }
  
  formattedParts.push('CN='.concat((name || 'Unnamed attendee')));

  if(xNumGuests){
    formattedParts.push('X-NUM-GUESTS='.concat(xNumGuests));
  }

  var formattedAttendee = formattedParts.join(';').concat(email ? ":mailto:".concat(email) : '');
 

  return formattedAttendee
}

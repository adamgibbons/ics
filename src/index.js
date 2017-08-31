import {
  buildEvent,
  validateEvent,
  formatEvent
} from './pipeline'

const createEvent = (attributes) => {
  if (attributes) {
    return formatEvent(buildEvent(attributes))
  }
  return formatEvent(buildEvent())
}

export {
  buildEvent,
  formatEvent,
  createEvent
}

//   // Follow ISO 8601 string rules:
//   // If `start` contains an uppercase T or a space,
//   // it's a date-time; otherwise, it's just a date.
//   function formatDTSTART(string, tz) {
    
//     if (tz) {
//       // Form #3: DATE WITH LOCAL TIME AND TIME ZONE REFERENCE
//       return 'DTSTART;TZID=' + tz + ':' + moment(string).format('YYYYMMDDTHHmm00');
//     }

//     if (isDateTime(string) && moment.parseZone(string).utcOffset() === 0 && !isUTC(string)) {
//       // Form #1: DATE WITH LOCAL TIME
//       return 'DTSTART:' + moment(string).format('YYYYMMDDTHHmm00');
//     }

//     if (isDateTime(string)) {
//       // Form #2: DATE WITH UTC TIME
//       return 'DTSTART:' + moment.utc(string).format('YYYYMMDDTHHmm00') + 'Z';
//     }

//     return 'DTSTART;VALUE=DATE:' + moment(string).format('YYYYMMDD');
//   }

//   function formatDTEND(startString, endString, tz, tzEnd) {

//     if (!startString) {
//       return 'DTEND:' + moment().add(1, 'days').format('YYYYMMDD');
//     }

//     if (tz && !tzEnd && !endString) {
//       return 'DTEND;TZID=' + tz + ':' + moment(startString).format('YYYYMMDDTHHmm00');
//     }

//     if (tz && !tzEnd && endString) {
//       return 'DTEND;TZID=' + tz + ':' + moment(endString).format('YYYYMMDDTHHmm00');
//     }

//     if (tz && tzEnd && endString) {
//       return 'DTEND;TZID=' + tzEnd + ':' + moment(endString).format('YYYYMMDDTHHmm00');
//     }

//     if (endString && !isDateTime(startString)) {
//       return 'DTEND;VALUE=DATE:' + moment(endString).format('YYYYMMDD');
//     }

//     if (endString && isDateTime(startString)) {
//       return 'DTEND:' + moment(endString).format('YYYYMMDDTHHmm00');
//     }

//     if (!endString && !isDateTime(startString)) {
//       return 'DTEND;VALUE=DATE:' + moment(startString).add(1, 'days').format('YYYYMMDD');
//     }

//     if (!endString && isDateTime(startString) && moment.parseZone(startString).utcOffset() === 0) {
//       return 'DTEND:' + moment(startString).format('YYYYMMDDTHHmm00');
//     }
//   }


//   function formatAlarms(attributes) {
//     if (attributes.alarms) {
//       return attributes.alarms.map(function (alarmObj) {
//         var alarmData = ['BEGIN:VALARM']
//           .concat(formatProperty('ACTION', alarmObj.action || 'DISPLAY'))
//           .concat(formatProperty('TRIGGER', alarmObj.trigger || '-PT1H'));

//         if (alarmObj.description) {
//           alarmData = alarmData.concat(formatProperty('DESCRIPTION', alarmObj.description));
//         }

//         if (alarmObj.summary) {
//           alarmData = alarmData.concat(formatProperty('SUMMARY', alarmObj.summary));
//         }

//         if (alarmObj.attach) {
//           alarmData = alarmData.concat(formatProperty('ATTACH', alarmObj.attach));
//         }

//         if (alarmObj.repeat && alarmObj.duration) {
//           alarmData = alarmData.concat(formatProperty('REPEAT', alarmObj.repeat ? 1 : 0))
//             .concat(formatProperty('DURATION', alarmObj.duration));
//         }

//         return alarmData.concat('END:VALARM').join('\r\n');
//       });
//     }
//     return null;
//   }

//   function formatAttachments(attributes) {
//     if (attributes.attachments) {
//       return attributes.attachments.map(function (path) {
//         return 'ATTACH:' + path;
//       });
//     }
//     return null;
//   }


//   function defineTimeZone(attributes) {
//     // probs make this a switch statement...
//     switch (attributes.timeZone) {
//       case 'America/New_York':
//         return [
//           'BEGIN:VTIMEZONE',
//           'TZID:America/New_York',
//           'BEGIN:STANDARD',
//           'DTSTART:20071104T020000',
//           'RRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU',
//           'TZOFFSETFROM:-0400',
//           'TZOFFSETTO:-0500',
//           'TZNAME:EST',
//           'END:STANDARD',
//           'BEGIN:DAYLIGHT',
//           'DTSTART:20070311T020000',
//           'RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU',
//           'TZOFFSETFROM:-0500',
//           'TZOFFSETTO:-0400',
//           'TZNAME:EDT',
//           'END:DAYLIGHT',
//           'END:VTIMEZONE'
//         ];
//         break;
//       // case 'Ameria/Chicago':
//       default:
//         return null;
//     }
//   }
// }

// ICS.prototype.buildEvent = function(attributes) {
//   return buildEvent(attributes);
// };

// ICS.prototype.getDestination = function(_filepath_) {
//   var filepath = _filepath_ || this.options.filename + '.ics';
//   var fileObj = path.parse(filepath);
//   var result = path.resolve(process.cwd(), fileObj.dir, fileObj.name + '.ics');

//   return result;
// };

// ICS.prototype.buildEvent = function(attributes, _options_, cb) {
//   var options = arguments.length === 3 ? _.merge(this.options, _options_) : this.options
//   ,   file = this.buildEvent(attributes)
//   ,   destination = this.getDestination(options.filepath)
//   ,   cb = arguments.length === 3 ? cb : _options_;

//   fs.writeFile(destination, file, function (err, data) {
//     if (err) return cb(err);
//     return cb(null, file);
//   });
// };

// module.exports = ICS;

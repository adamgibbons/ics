import { ICalendar } from "./components/calendar.component";
import { IGeographicPositionComponentProp } from "./properties/geographicPosition.component";
import { ILocationComponentProp } from "./properties/location.component";
import { IOrganizerComponentProp } from "./properties/organizer.component";
import { IAttendeeComponentProp } from "./properties/attendee.prop";
import { IEventComponent } from "./components/event.component";
import { ITimezoneComponent } from "./components/timeZone.component";
import { createEvent } from "./components/event.component";

export interface DateTimeProperty {
    value: string;
    tzid?: string;
}
// DTSTART:19970714T133000                   ; Local time
// DTSTART:19970714T173000Z                  ; UTC time
// DTSTART;TZID=America/New_York:19970714T133000
//                                           ; Local time and time
//                                           ; zone reference
export interface IIanaComponent {
    uid: string;
}

function printDateTimeStart(dateTimeStart: DateTimeProperty) {
    let formattedResponse = 'DTSTART'
    if (dateTimeStart.tzid) {
        // FORM #3: DATE WITH LOCAL TIME AND TIME ZONE REFERENCE
        formattedResponse += `;TZID=${dateTimeStart.tzid}:${dateTimeStart.value}`
    } else if (dateTimeStart.value.includes("Z")) {
        // FORM #2: DATE WITH UTC TIME
        formattedResponse += `:${new Date(dateTimeStart.value).toISOString().replace(/[-:]/g, '').slice(0, 15) + 'Z'}`
    } else {
        // FORM #1: DATE WITH LOCAL TIME
        formattedResponse += `:${dateTimeStart.value}`
    }

    formattedResponse += '\r\n'
    return formattedResponse;
}

function printLocation(location: ILocationComponentProp) {
    let formattedResponse = `LOCATION;ALTREP="${location.altrep}":${location.text}\r\n`
    return formattedResponse;
}

function printGeographicPosition(geographicPosition: IGeographicPositionComponentProp) {
    let formattedResponse = `GEO:${geographicPosition.latitude};${geographicPosition.longitude}\r\n`
    return formattedResponse;
}

function printAttendee(attendee: IAttendeeComponentProp) {
    let formattedResponse = `ATTENDEE`
    if (attendee.cn) {
        formattedResponse += `;CN=${attendee.cn}`
    }
    if (attendee.cutype) {
        formattedResponse += `;CUTYPE=${attendee.cutype || "INDIVIDUAL"}`
    }
    if (attendee.role) {
        formattedResponse += `;ROLE=${attendee.role}`
    }
    if (attendee.partstat) {
        formattedResponse += `;PARTSTAT=${attendee.partstat}`
    }
    if (attendee.rsvp) {
        formattedResponse += `;RSVP=${attendee.rsvp}`
    }
    formattedResponse += `:mailto:${attendee.mailto}\r\n`
    return formattedResponse;
}

function printOrganizer(organizer: IOrganizerComponentProp) {
    let formattedResponse = 'ORGANIZER'
    if (organizer.cn) {
        formattedResponse += `;CN=${organizer.cn}`
    }
    if (organizer.sentBy) {
        formattedResponse += `;SENT-BY=${organizer.sentBy};`
    }
    if (organizer.language) {
        formattedResponse += `;LANGUAGE=${organizer.language};`
    }
    formattedResponse += `:mailto:${organizer.mailto}\r\n`
    return formattedResponse;
}

export function createCalendar(calendar: ICalendar) {
    calendar.version = calendar.version || "2.0";
    calendar.calscale = calendar.calscale || "GREGORIAN";
    calendar.method = calendar.method || "PUBLISH";
    return calendar;
}



function formatDateTime(d: Date) {
    return d.toISOString().replace(/[-:]/g, '').slice(0, 15) + 'Z';
}

export function printEvent(event: IEventComponent, calendar?: ICalendar, timezone?: ITimezoneComponent) {
    let formattedResponse = 'BEGIN:VCALENDAR\r\n'
    formattedResponse += `PRODID:${calendar?.prodid || "-ADAM GIBBONS//ICS NPM PACKAGE//TS"}\r\n`
    formattedResponse += `VERSION:${calendar?.version}\r\n`
    formattedResponse += `CALSCALE:${calendar?.calscale}\r\n`
    formattedResponse += `METHOD:${calendar?.method}\r\n`

    if (timezone) {
        formattedResponse += `BEGIN:VTIMEZONE\r\n`
        formattedResponse += `TZID:${timezone.uid}\r\n`
        formattedResponse += `X-LIC-LOCATION:${timezone.uid}\r\n`
        formattedResponse += `BEGIN:DAYLIGHT\r\n`
        formattedResponse += `TZOFFSETFROM:-0800\r\n`
        formattedResponse += `TZOFFSETTO:-0700\r\n`
        formattedResponse += `TZNAME:PDT\r\n`
        formattedResponse += `DTSTART:19700308T020000\r\n`
        formattedResponse += `RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU\r\n`
        formattedResponse += `END:DAYLIGHT\r\n`
        formattedResponse += `END:VTIMEZONE\r\n`
    }

    formattedResponse += `BEGIN:VEVENT\r\n`
    formattedResponse += `UID:${event.uid}\r\n`
    formattedResponse += `CLASS:${event.class}\r\n`
    if (event.dateTimeStamp) {
        formattedResponse += `DTSTAMP:${formatDateTime(event.dateTimeStamp)}\r\n`
    }
    if (event.dateTimeStart) {
        formattedResponse += printDateTimeStart(event.dateTimeStart)
    }
    if (event.dateTimeEnd) {
        formattedResponse += `DTEND:${formatDateTime(event.dateTimeEnd)}\r\n`
    }

    if (event.organizer) {
        formattedResponse += printOrganizer(event.organizer)
    }

    if (event.geo) {
        formattedResponse += printGeographicPosition(event.geo)
    }

    if (event.attendees) {
        for (const attendee of event.attendees) {
            formattedResponse += printAttendee(attendee)
        }
    }

    if (event.location) {
        formattedResponse += printLocation(event.location)
    }

    if (event.status) {
        formattedResponse += `STATUS:${event.status}\r\n`
    }

    if (event.summary) {
        formattedResponse += `SUMMARY:${event.summary}\r\n`
    }

    if (event.description) {
        formattedResponse += `DESCRIPTION:${event.description}\r\n`
    }

    formattedResponse += `END:VEVENT\r\n`
    formattedResponse += `END:VCALENDAR\r\n`
    return formattedResponse;
}

const evt = printEvent(createEvent({
    uid: "1234567890",
    organizer: {
        cn: "Adam Gibbons",
        mailto: "agibbons@ivy.energy",
    },
    location: {
        text: "Conference Room - F123, Bldg. 002",
        altrep: "http://xyzcorp.com/conf-rooms/f123.vcf",
    },
    dateTimeStart: {
        value: "2025-02-14T18:00:00Z",
    },
    dateTimeEnd: new Date("2025-02-14T20:00:00Z"),
    status: "confirmed",
    summary: "Valentine's Day Party",
    description: "Wear red or be turned away",
    attendees: [
        {
            cn: "Brittany Gibbons",
            mailto: "agibbons+brittany@ivy.energy",
            cutype: "INDIVIDUAL",
            role: "REQ-PARTICIPANT",
            partstat: "NEEDS-ACTION",
            rsvp: true,
        },
        {
            cn: "Dave Gibbons",
            mailto: "agibbons+dave@ivy.energy",
            cutype: "INDIVIDUAL",
            role: "REQ-PARTICIPANT",
            partstat: "ACCEPTED",
            rsvp: true,
        },
    ],
}), createCalendar({}));

console.log(evt);

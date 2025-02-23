type CalendarComponent = "eventc" | "todoc" | "journalc" | "freebusyc" | "timezonec" | "iana-comp" | "x-comp";

interface ICalendar {
    prodid?: string;
    version?: string;
    calscale?: string;
    method?: string;
    components?: CalendarComponent[];
}

interface IOrganizerComponent {
    mailto: string;
    cn?: string;
    sentBy?: string;
    language?: string;
}

interface IAttendeeComponent extends IOrganizerComponent {
    cutype?: "INDIVIDUAL" | "GROUP" | "RESOURCE" | "ROOM" | "UNKNOWN";
    role?: "REQ-PARTICIPANT" | "OPT-PARTICIPANT" | "NON-PARTICIPANT";
    partstat?: "NEEDS-ACTION" | "ACCEPTED" | "DECLINED" | "TENTATIVE" | "DELEGATED" | "COMPLETED" | "IN-PROCESS" | "CANCELLED";
    rsvp?: boolean;
    xnum_guests?: number;
}

interface ILocationComponent {
    text: string;
    language?: string;
    altrep?: string;
}

interface IGeographicPositionComponent {
    latitude: number;
    longitude: number;
}

interface DateTime {
    type: "date" | "date-time";
    value: string;
}

interface IEventComponent {
    // ; The following are REQUIRED,
    // ; but MUST NOT occur more than once.

    dateTimeStamp?: Date;
    uid: string;

    // ; The following is REQUIRED if the component
    // ; appears in an iCalendar object that doesn't
    // ; specify the "METHOD" property; otherwise, it
    // ; is OPTIONAL; in any case, it MUST NOT occur
    // ; more than once.
    // ;
    dateTimeStart: Date;
    // ;
    // ; The following are OPTIONAL,
    // ; but MUST NOT occur more than once.
    // ;
    // class / created / description / geo /
    // last-mod / location / organizer / priority /
    // seq / status / summary / transp /
    // url / recurid /
    class?: "PUBLIC" | "PRIVATE" | "CONFIDENTIAL";
    created?: string;
    description?: string;
    geo?: IGeographicPositionComponent;
    lastMod?: string;
    location?: ILocationComponent;
    organizer?: IOrganizerComponent;
    priority?: number;
    seq?: number;
    status?: "tentative" | "confirmed" | "cancelled";
    summary?: string;
    transp?: string;
    url?: string;
    recurid?: string;
    // ;
    // ; The following is OPTIONAL,
    // ; but SHOULD NOT occur more than once.
    // ;
    // rrule /
    // ;
    // ; Either 'dtend' or 'duration' MAY appear in
    // ; a 'eventprop', but 'dtend' and 'duration'
    // ; MUST NOT occur in the same 'eventprop'.
    // ;
    // dtend / duration /
    dateTimeEnd?: Date;
    // duration?: { hours: number; minutes: number; seconds: number };
    // ;
    // ; The following are OPTIONAL,
    // ; and MAY occur more than once.
    // ;
    // attach / attendee / categories / comment /
    // contact / exdate / rstatus / related /
    // resources / rdate / x-prop / iana-prop
    attachments?: string[];
    attendees?: IAttendeeComponent[];
    categories?: string[];
    comments?: string[];
    contacts?: string[];
    exdates?: string[];
    rstatuses?: string[];
    relateds?: string[];
    resources?: string[];
    rdates?: string[];
    xProps?: string[];
    ianaProps?: string[];
}

interface IToDoComponent {
    uid: string;
    status?: "needs-action" | "completed" | "in-process" | "cancelled";
    attendees?: IAttendeeComponent[];
}

interface IJournalComponent {
    uid: string;
    status?: "final" | "draft" | "cancelled";
    attendees?: IAttendeeComponent[];
}

interface IFreeBusyComponent {
    uid: string;
}

interface ITimezoneComponent {
    uid: string;
}

interface IIanaComponent {
    uid: string;
}

interface ITimezoneComponent {
    uid: string;
}

function printLocation(location: ILocationComponent) {
    let formattedResponse = `LOCATION;ALTREP="${location.altrep}":${location.text}\r\n`
    return formattedResponse;
}

function printGeographicPosition(geographicPosition: IGeographicPositionComponent) {
    let formattedResponse = `GEO:${geographicPosition.latitude};${geographicPosition.longitude}\r\n`
    return formattedResponse;
}

function printAttendee(attendee: IAttendeeComponent) {
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

function printOrganizer(organizer: IOrganizerComponent) {
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

export function createEvent(event: IEventComponent) {
    event.dateTimeStamp = new Date()
    event.class = event.class || "PUBLIC"

    return event;
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
        formattedResponse += `DTSTART:${formatDateTime(event.dateTimeStart)}\r\n`
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

    formattedResponse += `STATUS:${event.status}\r\n`
    formattedResponse += `SUMMARY:${event.summary}\r\n`
    formattedResponse += `DESCRIPTION:${event.description}\r\n`
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
    dateTimeStart: new Date("2025-02-14T18:00:00Z"),
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


// BEGIN:VCALENDAR
// PRODID:-//xyz Corp//NONSGML PDA Calendar Version 1.0//EN
// VERSION:2.0
// BEGIN:VEVENT
// DTSTAMP:19960704T120000Z
// UID:uid1@example.com
// ORGANIZER:mailto:jsmith@example.com
// DTSTART:19960918T143000Z
// DTEND:19960920T220000Z
// STATUS:CONFIRMED
// CATEGORIES:CONFERENCE
// SUMMARY:Networld+Interop Conference
// DESCRIPTION:Networld+Interop Conference
//   and Exhibit\nAtlanta World Congress Center\n
//  Atlanta\, Georgia
// END:VEVENT
// END:VCALENDAR

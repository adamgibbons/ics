import { DateTimeComponentProp } from "../properties/dateTime.prop";
import { IGeographicPositionComponentProp } from "../properties/geographicPosition.prop";
import { ILocationComponentProp } from "../properties/location.prop";
import { IOrganizerComponentProp } from "../properties/organizer.prop";
import { IAttendeeComponentProp } from "../properties/attendee.prop";
import { ICalendar } from "./calendar.component";
import { ITimezoneComponent } from "./timeZone.component";
import { formatDateTime } from "../properties/dateTime.prop";
import { printOrganizer } from "../properties/organizer.prop";
import { printGeographicPosition } from "../properties/geographicPosition.prop";
import { printAttendee } from "../properties/attendee.prop";
import { printLocation } from "../properties/location.prop";

// DTSTART:19970714T133000                   ; Local time
// DTSTART:19970714T173000Z                  ; UTC time
// DTSTART;TZID=America/New_York:19970714T133000
//                                           ; Local time and time
//                                           ; zone reference

function printDateTimeStart(dateTimeStart: DateTimeComponentProp) {
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

function printDateTimeEnd(dateTimeEnd: DateTimeComponentProp) {
    let formattedResponse = 'DTEND'
    if (dateTimeEnd.tzid) {
        // FORM #3: DATE WITH LOCAL TIME AND TIME ZONE REFERENCE
        formattedResponse += `;TZID=${dateTimeEnd.tzid}:${dateTimeEnd.value}`
    } else if (dateTimeEnd.value.includes("Z")) {
        // FORM #2: DATE WITH UTC TIME
        formattedResponse += `:${new Date(dateTimeEnd.value).toISOString().replace(/[-:]/g, '').slice(0, 15) + 'Z'}`
    } else {
        // FORM #1: DATE WITH LOCAL TIME
        formattedResponse += `:${dateTimeEnd.value}`
    }

    formattedResponse += '\r\n'
    return formattedResponse;
}


export interface IEventComponent {
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
    dateTimeStart: DateTimeComponentProp;
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
    geo?: IGeographicPositionComponentProp;
    lastMod?: string;
    location?: ILocationComponentProp;
    organizer?: IOrganizerComponentProp;
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
    dateTimeEnd?: DateTimeComponentProp;
    // duration?: { hours: number; minutes: number; seconds: number };
    // ;
    // ; The following are OPTIONAL,
    // ; and MAY occur more than once.
    // ;
    // attach / attendee / categories / comment /
    // contact / exdate / rstatus / related /
    // resources / rdate / x-prop / iana-prop
    attachments?: string[];
    attendees?: IAttendeeComponentProp[];
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

export function createEvent(event: IEventComponent) {
    event.dateTimeStamp = new Date()
    event.class = event.class || "PUBLIC"

    return event;
}

export function printEvent(event: IEventComponent, calendar?: ICalendar, timezone?: ITimezoneComponent) {
    let formattedResponse = 'BEGIN:VCALENDAR\r\n'
    formattedResponse += `PRODID:${calendar?.prodid}\r\n`
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
        formattedResponse += printDateTimeEnd(event.dateTimeEnd)
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

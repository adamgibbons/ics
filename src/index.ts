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
    cutype?: "INDIVIDUAL" | "GROUP" | "RESOURCE" | "ROOM";
    role?: "REQ-PARTICIPANT" | "OPT-PARTICIPANT" | "NON-PARTICIPANT";
    partstat?: "NEEDS-ACTION" | "ACCEPTED" | "DECLINED" | "TENTATIVE" | "DELEGATED" | "COMPLETED" | "IN-PROCESS" | "CANCELLED";
    rsvp?: boolean;
    xnum_guests?: number;
}

interface ITimezoneComponent {
    uid: string;
}

interface IEventComponent {
    // dtstamp: string;
    uid: string;
    dtstart: Date;
    dtend: Date;
    dtStamp?: Date;
    summary: string; // title
    class?: "PUBLIC" | "PRIVATE" | "CONFIDENTIAL";
    attendees?: IAttendeeComponent[];
    organizer?: IOrganizerComponent;
    // created?: string;
    description?: string;
    // geo?: string;
    // last-mod?: string;
    // location?: string;
    
    // priority?: string;
    // seq?: string;
    status?: "tentative" | "confirmed" | "cancelled";
    // summary?: string;
    // transp?: string;
    // url?: string;
    // recurid?: string;
    // rrule?: string;

    // attach?: string;
    // attendee?: string;
    // categories?: string;
    comment?: string;
    // contact?: string;
    // exdate?: string;
    // rstatus?: string;
    // related?: string;
    // resources?: string;
    // rdate?: string;
    // x-prop?: string;
    // iana-prop?: string;
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

export function createCalendar(calendar: ICalendar) {
    calendar.version = calendar.version || "2.0";
    return calendar;
}

export function createEvent(event: IEventComponent) {
    event.dtStamp = new Date();
    return event;
}

export function printEvent(event: IEventComponent, calendar: ICalendar, timezone?: ITimezoneComponent) {
    let formattedResponse = 'BEGIN:VCALENDAR\r\n'
    formattedResponse += `PRODID:${calendar.prodid || "-ADAM GIBBONS//ICS NPM PACKAGE//TS"}\r\n`
    formattedResponse += `VERSION:${calendar.version || "2.0"}\r\n`
    formattedResponse += `CALSCALE:${calendar.calscale || "GREGORIAN"}\r\n`
    formattedResponse += `METHOD:${calendar.method || "REQUEST"}\r\n`

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
    // formattedResponse += `DTSTAMP:${event.dtStamp.toISOString()}\r\n`
    formattedResponse += `DTSTART:${event.dtstart}\r\n`
    formattedResponse += `DTEND:${event.dtend}\r\n`

    if (event.organizer) {
        formattedResponse += `ORGANIZER`
        if (event.organizer.cn) {   
            formattedResponse += `;CN=${event.organizer.cn}`
        }
        if (event.organizer.sentBy) {
            formattedResponse += `;SENT-BY=${event.organizer.sentBy};`
        }
        if (event.organizer.language) {
            formattedResponse += `;LANGUAGE=${event.organizer.language};`
        }
        formattedResponse += `:mailto:${event.organizer.mailto}\r\n`
    }

    if (event.attendees) {
        for (const attendee of event.attendees) {
            formattedResponse += `ATTENDEE`
            if (attendee.cn) {
                formattedResponse += `;CN=${attendee.cn}`
            }
            if (attendee.cutype) {
                formattedResponse += `;CUTYPE=${attendee.cutype}`
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
            formattedResponse += `:mailto:  ${attendee.mailto}\r\n`
        }
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
        mailto: "mailto:agibbons@ivy.energy",
    },
    dtstart: new Date("20250222T203000Z"),
    dtend: new Date("20250222T213000Z"),
    status: "confirmed",
    summary: "Summary is here",
    description: "Description is here",
    attendees: [
        {
            cn: "Brittany Gibbons",
            mailto: "mailto:agibbon+brittany@ivy.energy",
            cutype: "INDIVIDUAL",
            role: "REQ-PARTICIPANT",
            partstat: "NEEDS-ACTION",
            rsvp: true,
        },
        {
            cn: "Dave Gibbons",
            mailto: "mailto:agibbon+dave@ivy.energy",
            cutype: "INDIVIDUAL",
            role: "REQ-PARTICIPANT",
            partstat: "ACCEPTED",
            rsvp: true,
        },
    ],
}), createCalendar({
    prodid: "1234567890",
    calscale: "GREGORIAN",
    method: "PUBLISH",
}));

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

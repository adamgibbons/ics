import { nanoid } from "nanoid";
import { setDateTimeStamp } from "../utils";
import { printDateTime } from "../properties/dateTime.prop";
import { CreateDateTimeParams } from "../properties/dateTime.prop";
import { CommonClassTypes, CommonParticipationStatusTypes, CommonTranspTypes } from "../enums";
import { GeographicPositionComponentProp } from "../properties/geographicPosition.prop";
import { CreateLocationParams, printLocation } from "../properties/location.prop";
import { CreateOrganizerParams, printOrganizer } from "../properties/organizer.prop";
import { DurationComponentProps, printDuration } from "../properties/duration.prop";
import { CreateAttachmentParams, printAttachments } from "../properties/attachment.prop";
import { CreateAttendeeParams, printAttendees } from "../properties/attendee.prop";

export interface CreateEventParams {
    // ; The following are REQUIRED,
    // but MUST NOT occur more than once.
    uid?: string;
    dtstamp?: string | null;

    // ; The following is REQUIRED if the component
    // ; appears in an iCalendar object that doesn't
    // ; specify the "METHOD" property; otherwise, it
    // ; is OPTIONAL; in any case, it MUST NOT occur
    // ; more than once.
    dtstart?: CreateDateTimeParams;

    // ; The following are OPTIONAL,
    // ; but MUST NOT occur more than once.
    
    class?: CommonClassTypes | undefined;
    // created?: string | null;
    description?: string | undefined;
    geo?: GeographicPositionComponentProp;
    'last-mod'?: string | null;
    location?: CreateLocationParams;
    organizer?: CreateOrganizerParams;
    priority?: number;
    seq?: number | null;
    status?: CommonParticipationStatusTypes;
    summary?: string;
    transp?: CommonTranspTypes;
    url?: string;
    recurid?: string;
    // rrule
    // dtend?: CreateDateTimeParams;
    duration?: DurationComponentProps;

    // ; The following are OPTIONAL,
    // ; and MAY occur more than once.
    // attach / attendee / categories / comment /
    // contact / exdate / rstatus / related /
    // resources / rdate / x-prop / iana-prop

    attachments?: CreateAttachmentParams[];
    attendees?: CreateAttendeeParams[];
    categories?: string[];
    // comments?: string[];
    // contacts?: string[];
    // exdate?: CreateDateTimeParams[];
    // rstatus?: string;
    // related?: string;
    // resources?: string[];
    // rdate?: CreateDateTimeParams[];
}

export interface EventComponentProps extends CreateEventParams {
    uid: string;
    dtstamp: string;
}

export function createEvent(event: CreateEventParams): EventComponentProps {
    const uid = event.uid || nanoid(25);
    const dtstamp = event.dtstamp || setDateTimeStamp();
    return {
        uid,
        attachments: event.attachments,
        dtstamp,
        dtstart: event.dtstart,
        class: event.class,
        description: event.description,
        geo: event.geo,
        location: event.location,
        organizer: event.organizer,
        priority: event.priority,
        status: event.status,
        summary: event.summary,
        transp: event.transp,
        url: event.url,
        recurid: event.recurid,
        duration: event.duration,
        attendees: event.attendees,
        categories: event.categories,
    };
}

export function printEvent(event: EventComponentProps): string {

    let formattedResponse = 'BEGIN:VEVENT\r\n';

    formattedResponse += `UID:${event.uid}\r\n`;
    if (event.attachments) {
        formattedResponse += printAttachments(event.attachments);
    }
    if (event.attendees) {
        formattedResponse += printAttendees(event.attendees);
    }

    if (event.categories) {
        formattedResponse += `CATEGORIES:${event.categories.join(",")}\r\n`;
    }

    if (event.class) {
        formattedResponse += `CLASS:${event.class}\r\n`;
    }
    formattedResponse += `DTSTAMP:${event.dtstamp}\r\n`;

    // Turn these into formatters
    if (event.dtstart) {
        formattedResponse += 'DTSTART';
        formattedResponse += event.dtstart.type === "local-tzid" ? ';' : ':';
        formattedResponse += `${printDateTime(event.dtstart)}\r\n`;
    }

    // Remember these need to be wrapped
    if (event.description) {
        formattedResponse += `DESCRIPTION:${event.description}\r\n`;
    }

    if (event.duration) {
        formattedResponse += `DURATION:${printDuration(event.duration)}\r\n`;
    }

    if (event.geo) {
        formattedResponse += `GEO:${event.geo.latitude.toFixed(4)};${event.geo.longitude.toFixed(4)}\r\n`;
    }

    if (event.location) {
        formattedResponse += printLocation(event.location);
    }

    if (event.organizer) {
        formattedResponse += printOrganizer(event.organizer);
    }

    if (event.priority) {
        formattedResponse += `PRIORITY:${event.priority}\r\n`;
    }

    if (event.status) {
        formattedResponse += `STATUS:${event.status}\r\n`;
    }

    if (event.summary) {
        formattedResponse += `SUMMARY:${event.summary}\r\n`;
    }

    if (event.transp) {
        formattedResponse += `TRANSP:${event.transp}\r\n`;
    }

    if (event.url) {
        formattedResponse += `URL:${event.url}\r\n`;
    }

    if (event.recurid) {
        formattedResponse += `RECURID:${event.recurid}\r\n`;
    }

    formattedResponse += `END:VEVENT\r\n`;

    return formattedResponse;
}
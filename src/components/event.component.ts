import { DateTimeProperty } from "../index";
import { IGeographicPositionComponentProp } from "../properties/geographicPosition.component";
import { ILocationComponentProp } from "../properties/location.component";
import { IOrganizerComponentProp } from "../properties/organizer.component";
import { IAttendeeComponentProp } from "../properties/attendee.prop";

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
    dateTimeStart: DateTimeProperty;
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

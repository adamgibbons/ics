import { nanoid } from "nanoid";
import { setDateTimeStamp } from "../utils";
import { printDateTime } from "../properties/dateTime.prop";
import { CreateDateTimeParams } from "../properties/dateTime.prop";
import { CommonClassTypes, CommonParticipationStatusTypes, CommonTranspTypes } from "../enums";
import { GeographicPositionComponentProp } from "../properties/geographicPosition.prop";
import { CreateLocationParams, printLocation } from "../properties/location.prop";
import { CreateOrganizerParams } from "../properties/organizer.prop";

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
    // ;
    // class / created / description / geo /
    // last-mod / location / organizer / priority /
    // seq / status / summary / transp /
    // url / recurid /
    class?: CommonClassTypes | undefined;
    // created?: string | null;
    description?: string | undefined;
    geo?: GeographicPositionComponentProp;
    'last-mod'?: string | null;
    location?: CreateLocationParams;
    organizer?: CreateOrganizerParams;
    priority?: number | null;
    seq?: number | null;
    status?: CommonParticipationStatusTypes;
    summary?: string;
    transp?: CommonTranspTypes;
    url?: string;
    recurid?: string;
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
        dtstamp,
        dtstart: event.dtstart,
        class: event.class,
        description: event.description,
        geo: event.geo,
        location: event.location,
    };
}

export function printEvent(event: EventComponentProps): string {

    let formattedResponse = 'BEGIN:VEVENT\r\n';

    formattedResponse += `UID:${event.uid}\r\n`;
    formattedResponse += `DTSTAMP:${event.dtstamp}\r\n`;

    // Turn these into formatters
    if (event.dtstart) {
        formattedResponse += 'DTSTART';
        formattedResponse += event.dtstart.type === "local-tzid" ? ';' : ':';
        formattedResponse += `${printDateTime(event.dtstart)}\r\n`;
    }

    if (event.class) {
        formattedResponse += `CLASS:${event.class}\r\n`;
    }

    // Remember these need to be wrapped
    if (event.description) {
        formattedResponse += `DESCRIPTION:${event.description}\r\n`;
    }

    if (event.geo) {
        formattedResponse += `GEO:${event.geo.latitude.toFixed(4)};${event.geo.longitude.toFixed(4)}\r\n`;
    }

    if (event.location) {
        formattedResponse += printLocation(event.location);
    }

    formattedResponse += `END:VEVENT\r\n`;

    return formattedResponse;
}
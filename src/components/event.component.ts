import { nanoid } from "nanoid";
import { setDateTimeStamp } from "../utils";
import { printDateTime } from "../properties/dateTime.prop";
import { CreateDateTimeParams } from "../properties/dateTime.prop";
import { CommonClassTypes, CommonParticipationStatusTypes, CommonTranspTypes } from "../enums";
import { GeographicPositionComponentProp } from "../properties/geographicPosition.prop";
import { CreateLocationParams } from "../properties/location.prop";
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
    dtstart?: CreateDateTimeParams | null;

    // ; The following are OPTIONAL,
    // ; but MUST NOT occur more than once.
    // ;
    // class / created / description / geo /
    // last-mod / location / organizer / priority /
    // seq / status / summary / transp /
    // url / recurid /
    class?: CommonClassTypes;
    // created?: string | null;
    description?: string;
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
    const dtstart = event.dtstart || null;
    return {
        uid,
        dtstamp,
        dtstart
    };
}

export function printEvent(event: EventComponentProps): string {

    let formattedResponse = 'BEGIN:VEVENT\r\n';

    formattedResponse += `UID:${event.uid}\r\n`;
    formattedResponse += `DTSTAMP:${event.dtstamp}\r\n`;

    if (event.dtstart) {
        if (event.dtstart.type === "local-tzid") {
            formattedResponse += `DTSTART;${printDateTime(event.dtstart)}\r\n`;
        } else {
            formattedResponse += `DTSTART:${printDateTime(event.dtstart)}\r\n`;
        }
    }
    formattedResponse += `END:VEVENT\r\n`;

    return formattedResponse;
}
import { nanoid } from "nanoid";
import { setDateTimeStamp } from "../utils";

export interface CreateEventParams {
    uid?: string;
    dtstamp?: string | null;
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
        dtstamp
    };
}

export function printEvent(params: CreateEventParams): string {
    const event = createEvent(params);

    let formattedResponse = 'BEGIN:VEVENT\r\n';

    formattedResponse += `UID:${event.uid}\r\n`;
    formattedResponse += `DTSTAMP:${event.dtstamp}\r\n`;

    formattedResponse += `END:VEVENT\r\n`;
    return formattedResponse;
}
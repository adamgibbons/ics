import { nanoid } from "nanoid";
import { IAttendeeComponentProps, printAttendee } from "../properties/attendee.prop";
import { setDateTimeStamp } from "../utils";
import { GeographicPositionComponentProp, printGeographicPosition } from "../properties/geographicPosition.prop";
import { CreateLocationParams, printLocation } from "../properties/location.prop";

export interface CreateToDoParams {
    type: "todoc";
    dtstamp?: string | null;
    uid?: string | null;
    attendees?: IAttendeeComponentProps[] | null;
    class?: "PUBLIC" | "PRIVATE" | "CONFIDENTIAL" | null;
    completed?: string | null;
    created?: string | null;
    description?: string | null;
    dtstart?: string | null;
    geo?: GeographicPositionComponentProp | null;
    categories?: string[] | null;
    'last-mod'?: string | null;
    location?: CreateLocationParams | null;
    // organizer?: IOrganizerComponentProp | null;
    percent?: number | null;
    priority?: number | null;
    recurid?: string | null;
    seq?: number | null;
    status?: "NEEDS-ACTION" | "COMPLETED" | "IN-PROCESS" | "CANCELLED" | null;
    summary?: string | null;
    url?: string | null;
}

export interface ToDoComponentProps extends CreateToDoParams {
    dtstamp: string;
    uid: string;
}

export function createTodo(todo: CreateToDoParams): ToDoComponentProps {
    return {
        type: "todoc",
        dtstamp: todo.dtstamp ?? setDateTimeStamp(),
        uid: todo.uid ?? nanoid(25),
        status: todo.status ?? null,
        attendees: todo.attendees ?? null,
        class: todo.class ?? null,
        completed: todo.completed ?? null,
        created: todo.created ?? null,
        description: todo.description ?? null,
        dtstart: todo.dtstart ?? null,
        geo: todo.geo ?? null,
        categories: todo.categories ?? null,
        'last-mod': todo['last-mod'] ?? null,
        location: todo.location ?? null,
        percent: todo.percent ?? null,
        priority: todo.priority ?? null,
        recurid: todo.recurid ?? null,
        seq: todo.seq ?? null,
        summary: todo.summary ?? null,
        url: todo.url ?? null
    };
}

export function printToDo(params: CreateToDoParams): string {
    const todo = createTodo(params);

    let formattedResponse = 'BEGIN:VTODO\r\n';

    // formattedResponse += `DTSTAMP:${todo.dtstamp}\r\n`;
    if (todo.uid) {
        formattedResponse += `UID:${todo.uid}\r\n`;
    }

    formattedResponse += `DTSTAMP:${todo.dtstamp}\r\n`;

    if (todo.summary) {
        formattedResponse += `SUMMARY:${todo.summary}\r\n`;
    }
    if (todo.geo) {
        formattedResponse += printGeographicPosition(todo.geo);
    }
    if (todo.class) {
        formattedResponse += `CLASS:${todo.class}\r\n`;
    }
    if (todo.categories) {
        formattedResponse += `CATEGORIES:${todo.categories.join(",")}\r\n`;
    }
    if (todo.status) {
        formattedResponse += `STATUS:${todo.status}\r\n`;
    }
    if (todo.completed) {
        formattedResponse += `COMPLETED:${todo.completed}\r\n`;
    }
    if (todo.created) {
        formattedResponse += `CREATED:${todo.created}\r\n`;
    }
    if (todo.description) {
        formattedResponse += `DESCRIPTION:${todo.description}\r\n`;
    }
    if (todo.dtstart) {
        formattedResponse += `DTSTART:${todo.dtstart}\r\n`;
    }
    if (todo['last-mod']) {
        formattedResponse += `LAST-MOD:${todo['last-mod']}\r\n`;
    }
    if (todo.percent) {
        formattedResponse += `PERCENT:${todo.percent}\r\n`;
    }
    if (todo.priority) {
        formattedResponse += `PRIORITY:${todo.priority}\r\n`;
    }
    if (todo.attendees) {
        formattedResponse += todo.attendees.map(attendee => printAttendee(attendee)).join("");
    }
    if (todo.location) {
        formattedResponse += printLocation(todo.location);
    }
    formattedResponse += `END:VTODO\r\n`;
    return formattedResponse;
}
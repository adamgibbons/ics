import { nanoid } from "nanoid";
import { IAttendeeComponentProps, printAttendee } from "../properties/attendee.prop";

export interface IToDoComponentProps {
    type: "todoc";
    uid?: string | null;
    status?: "needs-action" | "completed" | "in-process" | "cancelled" | null;
    attendees?: IAttendeeComponentProps[] | null;
}

export function createTodo(todo: IToDoComponentProps) {
    return {
        type: "todoc",
        uuid: todo.uid ?? nanoid(25),
        status: todo.status ?? null,
        attendees: todo.attendees ?? null,
    };
}

export function printToDo(todo: IToDoComponentProps) {
    let formattedResponse = 'BEGIN:VTODO\r\n';
    if (todo.uid) { 
        formattedResponse += `UID:${todo.uid}\r\n`;
    }
    if (todo.status) {
        formattedResponse += `STATUS:${todo.status}\r\n`;
    }
    if (todo.attendees) {
        formattedResponse += todo.attendees.map(attendee => printAttendee(attendee)).join("");
    }
    formattedResponse += `END:VTODO\r\n`;
    return formattedResponse;
}
type CalendarComponentTypes = "eventc" | "todoc" | "journalc" | "freebusyc" | "timezonec" | "iana-comp" | "x-comp";

import { IToDoComponentProps, printToDo } from "./todo.component";



export interface ICalendar {
    prodid: string;
    version: string;
    calscale?: string | null;
    method?: string | null;
    components?: Array<IToDoComponentProps>;
}

export function createCalendar(calendar: ICalendar, components?: Array<IToDoComponentProps>) {
    calendar.prodid = calendar.prodid || "adamgibbons.com/ics";
    calendar.version = calendar.version ?? '4.0';
    calendar.calscale = calendar.calscale ?? null;
    calendar.method = calendar.method ?? null;
    calendar.components = components ?? [];
    return calendar;
}

export function printCalendar(calendar: ICalendar) {
    let formattedResponse = 'BEGIN:VCALENDAR\r\n';
    formattedResponse += `PRODID:${calendar.prodid}\r\n`;
    formattedResponse += `VERSION:${calendar.version}\r\n`;
    formattedResponse += `CALSCALE:${calendar.calscale}\r\n`;
    formattedResponse += `METHOD:${calendar.method}\r\n`;
    if (calendar.components && calendar.components.length) {
        formattedResponse += calendar.components.filter(component => component.type === "todoc").map(component => printToDo(component as IToDoComponentProps));

    }
    formattedResponse += `END:VCALENDAR\r\n`;
    return formattedResponse;
}

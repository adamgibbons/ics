export type CalendarComponent = "eventc" | "todoc" | "journalc" | "freebusyc" | "timezonec" | "iana-comp" | "x-comp";

export interface ICalendar {
    prodid: string;
    version: string;
    calscale?: string | null;
    method?: string | null;
    components?: CalendarComponent[];
}

export function createCalendar(calendar: ICalendar) {
    calendar.prodid = calendar.prodid || "adamgibbons.com/ics";
    calendar.version = calendar.version ?? '4.0';
    calendar.calscale = calendar.calscale ?? null;
    calendar.method = calendar.method ?? null;
    
    return calendar;
}

export function printCalendar(calendar: ICalendar) {
    let formattedResponse = 'BEGIN:VCALENDAR\r\n';
    formattedResponse += `PRODID:${calendar.prodid}\r\n`;
    formattedResponse += `VERSION:${calendar.version}\r\n`;
    formattedResponse += `CALSCALE:${calendar.calscale}\r\n`;
    formattedResponse += `METHOD:${calendar.method}\r\n`;
    formattedResponse += `END:VCALENDAR\r\n`;
    return formattedResponse;
}

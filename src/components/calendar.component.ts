export type CalendarComponent = "eventc" | "todoc" | "journalc" | "freebusyc" | "timezonec" | "iana-comp" | "x-comp";

export interface ICalendar {
    prodid?: string;
    version?: string;
    calscale?: string;
    method?: string;
    components?: CalendarComponent[];
}

export function createCalendar(calendar: ICalendar) {
    calendar.version = calendar.version || "2.0";
    calendar.calscale = calendar.calscale || "GREGORIAN";
    calendar.method = calendar.method || "PUBLISH";
    calendar.prodid = calendar.prodid || "-ADAM GIBBONS//ICS NPM PACKAGE//TS";
    return calendar;
}

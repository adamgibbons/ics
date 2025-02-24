export type CalendarComponent = "eventc" | "todoc" | "journalc" | "freebusyc" | "timezonec" | "iana-comp" | "x-comp";

export interface ICalendar {
    prodid?: string;
    version?: string;
    calscale?: string;
    method?: string;
    components?: CalendarComponent[];
}

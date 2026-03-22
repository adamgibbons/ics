import { IEventComponent } from "./components/event.component";
import { createEvent } from "./components/event.component";
import { createCalendar, ICalendar } from "./components/calendar.component";
import { printEvent } from "./components/event.component";

export interface IIanaComponent<Name, Properties> {
    uid: string;

}

export function printVEvent(event: IEventComponent, calendar: ICalendar) {
    return printEvent(createEvent(event), createCalendar(calendar));
}


// +-----------+---------+-------------------------+
// | Component | Status  | Reference               |
// +-----------+---------+-------------------------+
// | VCALENDAR | Current | RFC 5545, Section 3.4   |
// |           |         |                         |
// | VEVENT    | Current | RFC 5545, Section 3.6.1 |
// |           |         |                         |
// | VTODO     | Current | RFC 5545, Section 3.6.2 |
// |           |         |                         |
// | VJOURNAL  | Current | RFC 5545, Section 3.6.3 |
// |           |         |                         |
// | VFREEBUSY | Current | RFC 5545, Section 3.6.4 |
// |           |         |                         |
// | VTIMEZONE | Current | RFC 5545, Section 3.6.5 |
// |           |         |                         |
// | VALARM    | Current | RFC 5545, Section 3.6.6 |
// |           |         |                         |
// | STANDARD  | Current | RFC 5545, Section 3.6.5 |
// |           |         |                         |
// | DAYLIGHT  | Current | RFC 5545, Section 3.6.5 |
// +-----------+---------+-------------------------+

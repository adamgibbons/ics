import { IEventComponent } from "./components/event.component";
import { createEvent } from "./components/event.component";
import { createCalendar, ICalendar } from "./components/calendar.component";
// import testEvent from "./fixtures.test.json";
import { printEvent } from "./components/event.component";

export interface IIanaComponent {
    uid: string;
}

export function printVEvent(event: IEventComponent, calendar: ICalendar) {
    return printEvent(createEvent(event), createCalendar(calendar));
}

// printEvent(createEvent(testEvent as IEventComponent), createCalendar({}));


import { writeFileSync } from "node:fs";

import { IToDoComponentProps, printToDo } from "./components/todo.component";

const todo: IToDoComponentProps = {
    type: "todoc",
    uid: "20070313T123432Z-456553@example.com",
    status: "NEEDS-ACTION",
    summary: "Submit Quebec Income Tax Return for 2006",
    class: "CONFIDENTIAL",
    categories: ["FAMILY", "FINANCE"]
}



writeFileSync("todo.ics", printToDo(todo), "utf-8");
// printEvent
// printJournal
// printFreeBusy()
// printTimeZone()
// printAlarm()
// printStandard()
// printDaylight()

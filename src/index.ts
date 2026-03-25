import { IToDoComponentProps, printToDo } from "./components/todo.component";

const todo: IToDoComponentProps = {
    type: "todoc",
    uid: "20070313T123432Z-456553@example.com",
    status: "NEEDS-ACTION",
    summary: "Submit Quebec Income Tax Return for 2006",
    class: "CONFIDENTIAL",
    categories: ["FAMILY", "FINANCE"]
}

console.log(printToDo(todo));
// printEvent
// printJournal
// printFreeBusy()
// printTimeZone()
// printAlarm()
// printStandard()
// printDaylight()

import { IAttendeeComponentProp } from "../properties/attendee.prop";

export interface IToDoComponent {
    uid: string;
    status?: "needs-action" | "completed" | "in-process" | "cancelled";
    attendees?: IAttendeeComponentProp[];
}

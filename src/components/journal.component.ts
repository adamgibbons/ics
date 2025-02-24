import { IAttendeeComponentProp } from "../properties/attendee.prop";

export interface IJournalComponent {
    uid: string;
    status?: "final" | "draft" | "cancelled";
    attendees?: IAttendeeComponentProp[];
}

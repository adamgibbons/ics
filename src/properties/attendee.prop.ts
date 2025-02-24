import { IOrganizerComponentProp } from "./organizer.component";

export interface IAttendeeComponentProp extends IOrganizerComponentProp {
    cutype?: "INDIVIDUAL" | "GROUP" | "RESOURCE" | "ROOM" | "UNKNOWN";
    role?: "REQ-PARTICIPANT" | "OPT-PARTICIPANT" | "NON-PARTICIPANT";
    partstat?: "NEEDS-ACTION" | "ACCEPTED" | "DECLINED" | "TENTATIVE" | "DELEGATED" | "COMPLETED" | "IN-PROCESS" | "CANCELLED";
    rsvp?: boolean;
    xnum_guests?: number;
}

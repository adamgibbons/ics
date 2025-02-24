import { IOrganizerComponentProp } from "./organizer.prop";

export interface IAttendeeComponentProp extends IOrganizerComponentProp {
    cutype?: "INDIVIDUAL" | "GROUP" | "RESOURCE" | "ROOM" | "UNKNOWN";
    role?: "REQ-PARTICIPANT" | "OPT-PARTICIPANT" | "NON-PARTICIPANT";
    partstat?: "NEEDS-ACTION" | "ACCEPTED" | "DECLINED" | "TENTATIVE" | "DELEGATED" | "COMPLETED" | "IN-PROCESS" | "CANCELLED";
    rsvp?: boolean;
    xnum_guests?: number;
}

export function printAttendee(attendee: IAttendeeComponentProp) {
    let formattedResponse = `ATTENDEE`
    if (attendee.cn) {
        formattedResponse += `;CN=${attendee.cn}`
    }
    if (attendee.cutype) {
        formattedResponse += `;CUTYPE=${attendee.cutype || "INDIVIDUAL"}`
    }
    if (attendee.role) {
        formattedResponse += `;ROLE=${attendee.role}`
    }
    if (attendee.partstat) {
        formattedResponse += `;PARTSTAT=${attendee.partstat}`
    }
    if (attendee.rsvp) {
        formattedResponse += `;RSVP=${attendee.rsvp}`
    }
    formattedResponse += `:mailto:${attendee.mailto}\r\n`
    return formattedResponse;
}

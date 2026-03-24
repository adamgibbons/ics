import { IOrganizerComponentProp } from "./organizer.prop";

export interface IAttendeeComponentProps extends IOrganizerComponentProp {
    calAddress: string;
    member?: string;
    cutype?: "INDIVIDUAL" | "GROUP" | "RESOURCE" | "ROOM" | "UNKNOWN" | "MEMBER";
    role?: "REQ-PARTICIPANT" | "OPT-PARTICIPANT" | "NON-PARTICIPANT";
    partstat?: "NEEDS-ACTION" | "ACCEPTED" | "DECLINED" | "TENTATIVE" | "DELEGATED" | "COMPLETED" | "IN-PROCESS" | "CANCELLED";
    rsvp?: boolean;
    xNumGuests?: number | null;
}

export function createAttendee(attendee: IAttendeeComponentProps) {
    return {
        calAddress: attendee.calAddress,
        member: attendee.member ?? null,
        cn: attendee.cn ?? null,
        cutype: attendee.cutype ?? null,
        role: attendee.role ?? null,
        partstat: attendee.partstat ?? null,
        rsvp: attendee.rsvp ?? null,
        xNumGuests: attendee.xNumGuests ?? null,
    };
}

export function createAttendees(attendees: IAttendeeComponentProps[]) {
    return attendees.map(attendee => createAttendee(attendee));
}

export function printAttendee(props: IAttendeeComponentProps) {
    const attendee = createAttendee(props);

    let formattedResponse = `ATTENDEE`
    if (attendee.member) {
        formattedResponse += `;MEMBER=\"mailto:${attendee.member}\"`
    }
    if (attendee.cn) {
        formattedResponse += `;CN=${attendee.cn}`
    }
    if (attendee.cutype) {
        formattedResponse += `;CUTYPE=${attendee.cutype}`
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
    formattedResponse += `:mailto:${attendee.calAddress}\r\n`
    return formattedResponse;
}

export function printAttendees(attendees: IAttendeeComponentProps[]) {
    return attendees.map(attendee => printAttendee(attendee)).join("\r\n");
}
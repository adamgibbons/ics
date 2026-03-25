import { CommonUserTypes, CommonRoleTypes, CommonParticipationStatusTypes } from "../enums";
import { IOrganizerComponentProp } from "./organizer.prop";


export interface IAttendeeComponentProps extends IOrganizerComponentProp {
    member?: string;
    cutype?: CommonUserTypes | null;
    role?: CommonRoleTypes | null;
    partstat?: CommonParticipationStatusTypes | null;
    rsvp?: boolean;
    xNumGuests?: number | null;
    dir?: string;
    delegatedFrom?: string;
    delegatedTo?: string;
}

export function createAttendee(attendee: IAttendeeComponentProps) {
    return {
        mailto: attendee.mailto,
        sentBy: attendee.sentBy ?? null,
        language: attendee.language ?? null,
        member: attendee.member ?? null,
        cn: attendee.cn ?? null,
        cutype: attendee.cutype ?? null,
        role: attendee.role ?? null,
        partstat: attendee.partstat ?? null,
        rsvp: attendee.rsvp ?? null,
        xNumGuests: attendee.xNumGuests ?? null,
        dir: attendee.dir ?? null,
        delegatedFrom: attendee.delegatedFrom ?? null,
        delegatedTo: attendee.delegatedTo ?? null
    };
}

export function createAttendees(attendees: IAttendeeComponentProps[]) {
    return attendees.map(attendee => createAttendee(attendee));
}

export function printAttendee(props: IAttendeeComponentProps) {
    const attendee = createAttendee(props);

    let formattedResponse = `ATTENDEE`
    if (attendee.member) {
        formattedResponse += `;MEMBER="mailto:${attendee.member}"`
    }
    if (attendee.delegatedFrom) {
        formattedResponse += `;DELEGATED-FROM="mailto:${attendee.delegatedFrom}"`
    }
    if (attendee.delegatedTo) {
        formattedResponse += `;DELEGATED-TO="mailto:${attendee.delegatedTo}"`
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
    if (attendee.dir) {
        formattedResponse += `;DIR="${attendee.dir}"`
    }
    if (attendee.sentBy) {
        formattedResponse += `;SENT-BY=${attendee.sentBy}`
    }
    if (attendee.language) {
        formattedResponse += `;LANGUAGE=${attendee.language}`
    }
    formattedResponse += `:mailto:${attendee.mailto}\r\n`
    return formattedResponse;
}

export function printAttendees(attendees: IAttendeeComponentProps[]) {
    return attendees.map(attendee => printAttendee(attendee)).join('')
}
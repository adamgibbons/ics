export interface IOrganizerComponentProp {
    mailto: string;
    cn?: string;
    sentBy?: string;
    language?: string;
}

export function printOrganizer(organizer: IOrganizerComponentProp) {
    let formattedResponse = 'ORGANIZER'
    if (organizer.cn) {
        formattedResponse += `;CN=${organizer.cn}`
    }
    if (organizer.sentBy) {
        formattedResponse += `;SENT-BY=${organizer.sentBy};`
    }
    if (organizer.language) {
        formattedResponse += `;LANGUAGE=${organizer.language};`
    }
    formattedResponse += `:mailto:${organizer.mailto}\r\n`
    return formattedResponse;
}

export interface CreateOrganizerParams {
    mailto: string;
    cn?: string;
    sentBy?: string;
    language?: string;
    dir?: string;
}

export function createOrganizer(params: CreateOrganizerParams) {
    return {
        mailto: params.mailto,
        cn: params.cn ?? null,
        sentBy: params.sentBy ?? null,
        language: params.language ?? null,
        dir: params.dir ?? null,
    };
}

export function printOrganizer(params: CreateOrganizerParams) {
    const organizer = createOrganizer(params);

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
    if (organizer.dir) {
        formattedResponse += `;DIR=${organizer.dir};`
    }
    formattedResponse += `:mailto:${organizer.mailto}\r\n`
    return formattedResponse;
}

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
        cn: params.cn,
        sentBy: params.sentBy,
        language: params.language,
        dir: params.dir
    };
}

export function printOrganizer(params: CreateOrganizerParams) {
    let formattedResponse = 'ORGANIZER'

    if (params.cn) {
        formattedResponse += `;CN=${params.cn}`
    }
    if (params.sentBy) {
        formattedResponse += `;SENT-BY=${params.sentBy};`
    }
    if (params.language) {
        formattedResponse += `;LANGUAGE=${params.language};`
    }
    if (params.dir) {
        formattedResponse += `;DIR=${params.dir};`
    }

    formattedResponse += `:mailto:${params.mailto}\r\n`

    return formattedResponse;
}

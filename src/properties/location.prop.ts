export interface ILocationComponentProp {
    text: string;
    language?: string;
    altrep?: string;
}

export function printLocation(location: ILocationComponentProp) {
    let formattedResponse = `LOCATION;ALTREP="${location.altrep}":${location.text}\r\n`
    return formattedResponse;
}

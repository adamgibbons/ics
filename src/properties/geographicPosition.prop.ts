export interface IGeographicPositionComponentProp {
    latitude: number;
    longitude: number;
}

export function printGeographicPosition(geographicPosition: IGeographicPositionComponentProp) {
    let formattedResponse = `GEO:${geographicPosition.latitude};${geographicPosition.longitude}\r\n`
    return formattedResponse;
}

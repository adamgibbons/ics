export interface GeographicPositionComponentProp {
    latitude: number;
    longitude: number;
}

export function createGeographicPosition(geographicPosition: GeographicPositionComponentProp) {
    return {
        latitude: geographicPosition.latitude,
        longitude: geographicPosition.longitude,
    };
}

export function printGeographicPosition(params: GeographicPositionComponentProp) {
    const geographicPosition = createGeographicPosition(params);

    let formattedResponse = `GEO:${geographicPosition.latitude};${geographicPosition.longitude}\r\n`
    return formattedResponse;
}

import z from "zod";

export interface GeographicPositionComponentProp {
    latitude: number;
    longitude: number;
}

const GeographicPositionSchema = z.object({
    latitude: z.number().min(-90).max(90),
    longitude: z.number().min(-180).max(180)
});

export function createGeographicPosition(geographicPosition: GeographicPositionComponentProp) {
    try {
        GeographicPositionSchema.parse(geographicPosition);

        return {
            latitude: geographicPosition.latitude,
            longitude: geographicPosition.longitude,
        };

    } catch (error) {

        if (error instanceof z.ZodError) {
            console.error(error.issues);
            throw new Error(error.issues.map(issue => issue.message).join(", "));
        }

        throw new Error("Invalid geographic position");
    }
}

export function printGeographicPosition(params: GeographicPositionComponentProp) {
    const geographicPosition = createGeographicPosition(params);

    let formattedResponse = `GEO:${geographicPosition.latitude};${geographicPosition.longitude}\r\n`

    return formattedResponse;
}

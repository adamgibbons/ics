import { describe, expect, it } from "vitest";
import { createGeographicPosition } from "./geographicPosition.prop";

describe("createGeographicPosition", () => {
    it("creates a geographic position", () => {
        const geographicPosition = createGeographicPosition({ latitude: 37.386013, longitude: -122.082932 });
        expect(geographicPosition).toStrictEqual({ latitude: 37.386013, longitude: -122.082932 });
    });

    it("throws an error if the latitude is invalid", () => {
        expect(() => createGeographicPosition({ latitude: 91, longitude: -122.082932 })).toThrow("Too big");
    });

    it("throws an error if the longitude is invalid", () => {
        expect(() => createGeographicPosition({ latitude: 37.386013, longitude: -181 })).toThrow("Too small");
    });
});
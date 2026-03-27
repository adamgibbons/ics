import { describe, expect, it } from "vitest";  
import { createLocation, printLocation } from "./location.prop";

describe("location component", () => {
  it("prints a basic LOCATION", () => {
    const location = createLocation({ name: "Conference Room - F123, Bldg. 002" });
    const output = printLocation(location);
    expect(output).toContain("LOCATION:Conference Room - F123, Bldg. 002\r\n");
  });

  it("prints a LOCATION block all params", () => {
      const location = createLocation({
        name: "Conference Room - F123, Bldg. 002",
        alternativeRepresentation: "http://xyzcorp.com/conf-rooms/f123.vcf",
        language: "en-US"
    });
    const output = printLocation(location);
    expect(output).toContain("LOCATION;ALTREP=\"http://xyzcorp.com/conf-rooms/f123.vcf\";LANGUAGE=en-US:Conference Room - F123, Bldg. 002\r\n");
  });
});

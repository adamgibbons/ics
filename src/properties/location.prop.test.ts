import { describe, expect, it } from "vitest";  
import { printLocation } from "./location.prop";

describe("location component", () => {
  it("prints a basic LOCATION", () => {
    const output = printLocation({ name: "Conference Room - F123, Bldg. 002" });
    expect(output).toContain("LOCATION:Conference Room - F123, Bldg. 002\r\n");
  });

  it("prints a LOCATION block all params", () => {
    const output = printLocation({
        name: "Conference Room - F123, Bldg. 002",
        alternativeRepresentation: "http://xyzcorp.com/conf-rooms/f123.vcf",
        language: "en-US"
    });
    expect(output).toContain("LOCATION;ALTREP=\"http://xyzcorp.com/conf-rooms/f123.vcf\";LANGUAGE=en-US:Conference Room - F123, Bldg. 002\r\n");
  });
});
// LOCATION:Conference Room - F123\, Bldg. 002

// LOCATION;ALTREP="http://xyzcorp.com/conf-rooms/f123.vcf":
//  Conference Room - F123\, Bldg. 002
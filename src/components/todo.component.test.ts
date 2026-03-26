import { describe, expect, it } from "vitest";
import { printToDo } from "./todo.component";

describe("todo component", () => {
  it("prints a VTODO block with status", () => {
    const output = printToDo({
      type: "todoc",
      uid: "abc-123",
      dtstamp: "20070313T123432Z",
      status: "COMPLETED",
    });

    expect(output).toBe(
      [
        "BEGIN:VTODO",
        "UID:abc-123",
        "DTSTAMP:20070313T123432Z",
        "STATUS:COMPLETED",
        "END:VTODO",
        "",
      ].join("\r\n")
    );
  });

  it("prints a VTODO block without status when omitted", () => {
    const output = printToDo({
      type: "todoc",
      uid: "abc-123",
      dtstamp: "20070313T123432Z",
    });

    expect(output).toBe(
      [
        "BEGIN:VTODO",
        "UID:abc-123",
        "DTSTAMP:20070313T123432Z",
        "END:VTODO",
        "",
      ].join("\r\n")
    );
    expect(output).not.toContain("STATUS:");
  });

  it("prints a VTODO block with attendees", () => {
    const output = printToDo({
      type: "todoc",
      uid: "abc-123",
      dtstamp: "20070313T123432Z",
      attendees: [{ mailto: "joecool@example.com" }],
    });
    expect(output).toContain("ATTENDEE:mailto:joecool@example.com\r\n");
  });

  it("prints a VTODO block with all properties", () => {
    const output = printToDo({
      type: "todoc",
      uid: "20070313T123432Z-456553@example.com",
      dtstamp: "20070313T123432Z",
      dtstart: { value: [2007, 5, 14, 11], type: "utc" },
      geo: { latitude: 37.386013, longitude: -122.082932 },
      status: "NEEDS-ACTION",
      summary: "Submit Quebec Income Tax Return for 2006",
      class: "CONFIDENTIAL",
      categories: ["FAMILY", "FINANCE"],
      location: { name: "Conference Room - F123, Bldg. 002", alternativeRepresentation: "http://xyzcorp.com/conf-rooms/f123.vcf", language: "en-US" },
      organizer: { mailto: "jsmith@example.com", cn: "John Smith" }
    });

    expect(output).toContain([
      'BEGIN:VTODO',
      'UID:20070313T123432Z-456553@example.com',
      'DTSTAMP:20070313T123432Z',
      'DTSTART:20070514T110000Z',
      'SUMMARY:Submit Quebec Income Tax Return for 2006',
      'GEO:37.386013;-122.082932',
      'CLASS:CONFIDENTIAL',
      'CATEGORIES:FAMILY,FINANCE',
      'STATUS:NEEDS-ACTION',
      'LOCATION;ALTREP="http://xyzcorp.com/conf-rooms/f123.vcf";LANGUAGE=en-US:Conference Room - F123, Bldg. 002',
      'ORGANIZER;CN=John Smith:mailto:jsmith@example.com',
      'END:VTODO'
    ].join("\r\n"));
  });
});

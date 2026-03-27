import { describe, expect, it } from "vitest";
import { createEvent, printEvent } from "./event.component";

describe("event component", () => {
    it("prints the bare-minimum VEVENT block", () => {
        const event = createEvent({});
        const output = printEvent(event);
        expect(output).toContain("BEGIN:VEVENT\r\n");
        expect(output).toMatch(/UID:[\w-]{25}\r\n/);
        expect(output).toMatch(/DTSTAMP:\d{8}T\d{6}Z\r\n/);
        expect(output).toContain("END:VEVENT\r\n");
    });

    it("prints the VEVENT block with all fields", () => {
        const event = createEvent({
            uid: "test-uid",
            dtstamp: "20260326T120000Z",
            dtstart: {
                value: [2026, 3, 26, 12, 30],
                tzid: "America/New_York",
                type: "local-tzid"
            },
            class: "PUBLIC",
            description: "Test event",
            geo: {
                latitude: 40.7128,
                longitude: -74.0060
            },
            // lastmod,
            location: {
                name: "Conference Room - F123, Bldg. 002",
                alternativeRepresentation: "http://xyzcorp.com/conf-rooms/f123.vcf",
                language: "en-US"
            },
            organizer: {
                mailto: "jsmith@example.com",
                cn: "John Smith"
            },
            priority: 1,
            // seq:
            status: "ACCEPTED",
            summary: "Test event",
            transp: "OPAQUE",
            url: "https://www.google.com",
            recurid: "test-recurid"
        });
        const output = printEvent(event);

        expect(output).toBe([
            "BEGIN:VEVENT",
            "UID:test-uid",
            "DTSTAMP:20260326T120000Z",
            "DTSTART;TZID=America/New_York:20260326T123000",
            "CLASS:PUBLIC",
            "DESCRIPTION:Test event",
            "GEO:40.7128;-74.0060",
            "LOCATION;ALTREP=\"http://xyzcorp.com/conf-rooms/f123.vcf\";LANGUAGE=en-US:Conference Room - F123, Bldg. 002",
            "ORGANIZER;CN=John Smith:mailto:jsmith@example.com",
            "PRIORITY:1",
            "STATUS:ACCEPTED",
            "SUMMARY:Test event",
            "TRANSP:OPAQUE",
            "URL:https://www.google.com",
            "RECURID:test-recurid",
            "END:VEVENT",
            ""
        ].join("\r\n"));
    });
});
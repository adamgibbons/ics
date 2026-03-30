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
            categories: ["10k races", "Memorial Day Weekend", "Boulder CO"],
            class: "PUBLIC",
            dtstamp: "20260326T120000Z",
            dtstart: {
                value: [2026, 3, 26, 12, 30],
                tzid: "America/New_York",
                type: "local-tzid"
            },
            description: "Test event",
            duration: {
                weeks: 1,
                days: 2,
                hours: 3,
                minutes: 4,
                seconds: 5
            },
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
            recurid: "test-recurid",
            attachments: [
                {
                    url: "CID:jsmith.part3.960817T083000.xyzMail@example.com"
                },
                {
                    binary: "Zm9v",
                    fmtType: "application/pdf"
                }
            ],
            attendees: [
                {
                    mailto: "hcabot@example.com",
                    cn: "Henry Cabot",
                    role: "REQ-PARTICIPANT",
                    partstat: "TENTATIVE"
                },
                {
                    mailto: "jdoe@example.com",
                    cn: "Jane Doe",
                    role: "REQ-PARTICIPANT",
                    partstat: "ACCEPTED",
                    delegatedFrom: "bob@example.com"
                }
            ],
            comments: ["Foo bar", "fizz buzz"],
            contacts: [
                {
                    contact: "John Smith, +1-555-555-5555"
                }
            ]
        });
        const output = printEvent(event);

        expect(output).toBe([
            "BEGIN:VEVENT",
            "UID:test-uid",
            "ATTACH:CID:jsmith.part3.960817T083000.xyzMail@example.com",
            "ATTACH;ENCODING=BASE64;VALUE=BINARY;FMTTYPE=application/pdf:Zm9v",
            "ATTENDEE;CN=Henry Cabot;ROLE=REQ-PARTICIPANT;PARTSTAT=TENTATIVE:mailto:hcabot@example.com",
            "ATTENDEE;CN=Jane Doe;DELEGATED-FROM=\"mailto:bob@example.com\";ROLE=REQ-PARTICIPANT;PARTSTAT=ACCEPTED:mailto:jdoe@example.com",
            "CATEGORIES:10k races,Memorial Day Weekend,Boulder CO",
            "CLASS:PUBLIC",
            "COMMENT:Foo bar",
            "COMMENT:fizz buzz",
            "CONTACT:John Smith, +1-555-555-5555",
            "DTSTAMP:20260326T120000Z",
            "DTSTART;TZID=America/New_York:20260326T123000",
            "DESCRIPTION:Test event",
            "DURATION:P1W2DT3H4M5S",
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
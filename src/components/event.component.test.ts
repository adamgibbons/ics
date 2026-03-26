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
        });
        const output = printEvent(event);

        expect(output).toBe([
            "BEGIN:VEVENT",
            "UID:test-uid",
            "DTSTAMP:20260326T120000Z",
            "DTSTART;TZID=America/New_York:20260326T123000",
            "END:VEVENT",
            ""
        ].join("\r\n"));
        // expect(output).toContain(`DTSTART;TZID=America/New_York:20260326T123000\r\n`);
    });
});
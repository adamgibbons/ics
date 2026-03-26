import { describe, expect, it } from "vitest";
import { printEvent } from "./event.component";

describe("event component", () => {
    it("prints the bare-minimum VEVENT block", () => {
        const output = printEvent({
        });
        expect(output).toContain("BEGIN:VEVENT\r\n");
        expect(output).toMatch(/UID:[\w-]{25}\r\n/);
        expect(output).toMatch(/DTSTAMP:\d{8}T\d{6}Z\r\n/);
        expect(output).toContain("END:VEVENT\r\n");
    });
});
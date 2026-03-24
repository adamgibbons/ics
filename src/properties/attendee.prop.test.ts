// ATTENDEE;DELEGATED-FROM="mailto:immud@example.com":
// mailto:ildoit@example.com

import { describe, expect, it } from "vitest";
import { printAttendee } from "./attendee.prop";

describe("attendee component", () => {
    it("prints a ATTENDEE block with member", () => {
        const output = printAttendee({
            calAddress: "joecool@example.com",
            member: "DEV-GROUP@example.com",
            mailto: "mailto:joecool@example.com"
        });
        expect(output).toBe(
            [
                'ATTENDEE;MEMBER="mailto:DEV-GROUP@example.com":',
                'mailto:joecool@example.com',
                "\r\n"
            ].join("")
        );
    });
});
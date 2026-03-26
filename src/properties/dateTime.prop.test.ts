import { describe, expect, it } from "vitest";
import { printDateTime } from "./dateTime.prop";

describe("printDateTime", () => {
    // FORM #1: DATE WITH LOCAL TIME
    // The date with local time form is simply a DATE-TIME value that
    // does not contain the UTC designator nor does it reference a time
    // zone.  For example, the following represents January 18, 1998, at
    // 11 PM:
    //  19980118T230000

    it("prints a date with local time", () => {
        const result = printDateTime({
            value: [1998, 1, 18, 23],
            type: "local",
            tzid: null
        });

        expect(result).toBe("19980118T230000");
    });

    // FORM #2: DATE WITH UTC TIME

    // The date with UTC time, or absolute time, is identified by a LATIN
    // CAPITAL LETTER Z suffix character, the UTC designator, appended to
    // the time value.  For example, the following represents January 19,
    // 1998, at 0700 UTC:
    //  19980119T070000Z
    it("prints a date with UTC time", () => {
        const result = printDateTime({
            value: [1998, 1, 19, 7, undefined],
            type: "utc",
            tzid: null
        });

        expect(result).toBe("19980119T070000Z");
    });

    // FORM #3: DATE WITH LOCAL TIME AND TIME ZONE REFERENCE

    // The date and local time with reference to time zone information is
    // identified by the use the "TZID" property parameter to reference
    // the appropriate time zone definition.  "TZID" is discussed in
    // detail in Section 3.2.19.  For example, the following represents
    // 2:00 A.M. in New York on January 19, 1998:
    //  TZID=America/New_York:19980119T020000
    it("prints a date with local time and time zone reference", () => {
        const result = printDateTime({
            value: [1998, 1, 19, 2, 0, 0],
            type: "local-tzid",
            tzid: "America/New_York"
        });

        expect(result).toBe("TZID=America/New_York:19980119T020000");
    });
});

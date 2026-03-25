// ATTENDEE;DELEGATED-FROM="mailto:immud@example.com":
// mailto:ildoit@example.com

import { describe, expect, it } from "vitest";
import { printAttendee, printAttendees } from "./attendee.prop";

describe("attendee component", () => {
  it("prints a ATTENDEE block with member", () => {
    const output = printAttendees(
      [
        {
          mailto: "joecool@example.com",
          member: "DEV-GROUP@example.com"
        },
        {
          mailto: "ildoit@example.com",
          delegatedFrom: "immud@example.com"
        }
      ]
    );

    expect(output).toContain(
      [
        'ATTENDEE;MEMBER="mailto:DEV-GROUP@example.com":mailto:joecool@example.com',
        'ATTENDEE;DELEGATED-FROM="mailto:immud@example.com":mailto:ildoit@example.com'
      ].join("\r\n")
    )
  });

  it("prints a ATTENDEE block with delegate information for three event attendees", () => {
    const output = printAttendee({
      cn: "John Smith",
      dir: "ldap://example.com:6666/o=ABC%20Industries,c=US???(cn=Jim%20Dolittle)",
      mailto: "jimdo@example.com"
    });

    expect(output).toContain(
      'ATTENDEE;CN=John Smith;DIR="ldap://example.com:6666/o=ABC%20Industries,c=US???(cn=Jim%20Dolittle)":mailto:jimdo@example.com\r\n'
    );
  });
});
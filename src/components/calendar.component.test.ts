import { describe, expect, it } from "vitest";
import { createCalendar, ICalendar, printCalendar } from "./calendar.component";

describe("printCalendar", () => {
  it("emits a VCALENDAR block with explicit fields", () => {
    const calendar = createCalendar({
      prodid: "-//Example//EN",
      version: "2.0",
    });
    expect(printCalendar(calendar)).toBe(
      [
        "BEGIN:VCALENDAR",
        "PRODID:-//Example//EN",
        "VERSION:2.0",
        "CALSCALE:null",
        "METHOD:null",
        "END:VCALENDAR",
        "",
      ].join("\r\n")
    );
  });

  it("reflects createCalendar default prodid when empty", () => {
    const calendar = createCalendar({ prodid: "", version: "2.0" });
    expect(printCalendar(calendar)).toContain("PRODID:adamgibbons.com/ics\r\n");
  });

  it("reflects createCalendar default version when missing", () => {
    const calendar = createCalendar({ prodid: "x" } as ICalendar);
    expect(printCalendar(calendar)).toContain("VERSION:4.0\r\n");
  });

  it("includes optional calscale and method when set", () => {
    const calendar = createCalendar({
      prodid: "x",
      version: "4.0",
      calscale: "GREGORIAN",
      method: "PUBLISH",
    });
    expect(printCalendar(calendar)).toContain("CALSCALE:GREGORIAN\r\n");
    expect(printCalendar(calendar)).toContain("METHOD:PUBLISH\r\n");
  });

  it("includes a VTODO component when passed to createCalendar", () => {
    const calendar = createCalendar(
      {
        prodid: "x",
        version: "4.0",
      },
      [
        {
          type: "todoc",
          uid: "todo-123",
          status: "completed",
        },
      ]
    );

    const output = printCalendar(calendar);
    expect(output).toContain("BEGIN:VTODO\r\n");
    expect(output).toContain("UID:todo-123\r\n");
    expect(output).toContain("STATUS:completed\r\n");
    expect(output).toContain("END:VTODO\r\n");
  });

  it("excludes calscale and method when null", () => {
    const calendar = createCalendar({
      prodid: "x",
      version: "4.0",
      calscale: null,
      method: null,
    });
    expect(printCalendar(calendar)).not.toContain("CALSCALE:\r\n");
    expect(printCalendar(calendar)).not.toContain("METHOD:\r\n");
  });
});

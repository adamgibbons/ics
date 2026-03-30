import { describe, expect, it } from "vitest";
import { printAlarm } from "./alarm.component";

describe("alarm component", () => {
  it("prints a bare-minimum VALARM block", () => {
    const output = printAlarm({
      description: "Reminder",
      action: "DISPLAY",
      repeatCount: 0,
    });

    expect(output).toBe(
      ["BEGIN:VALARM", "ACTION:DISPLAY", "REPEAT:0", "END:VALARM", ""].join(
        "\r\n",
      ),
    );
    expect(output).not.toContain("TRIGGER:");
    expect(output).not.toContain("ATTACH:");
  });

  it("prints a VALARM block with trigger and attach", () => {
    const output = printAlarm({
      description: "Reminder",
      action: "AUDIO",
      repeatCount: 2,
      trigger: { minutes: 15 },
      attach: "ftp://example.com/pub/sounds/bell.aud",
    });

    expect(output).toBe(
      [
        "BEGIN:VALARM",
        "ACTION:AUDIO",
        "TRIGGER:PT15M",
        "REPEAT:2",
        "ATTACH:ftp://example.com/pub/sounds/bell.aud",
        "END:VALARM",
        "",
      ].join("\r\n"),
    );
  });
});

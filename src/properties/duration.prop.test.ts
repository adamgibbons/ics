import { describe, expect, it } from "vitest";
import { printDuration } from "./duration.prop";

describe("printDuration", () => {
  it("prints duration with all units", () => {
    const result = printDuration({
      weeks: 2,
      days: 3,
      hours: 4,
      minutes: 5,
      seconds: 6,
    });

    expect(result).toBe("P2W3DT4H5M6S");
  });

  it("prints duration with only date units", () => {
    const result = printDuration({
      weeks: 1,
      days: 2,
    });

    expect(result).toBe("P1W2DT");
  });

  it("prints duration with only time units", () => {
    const result = printDuration({
      hours: 1,
      minutes: 30,
      seconds: 15,
    });

    expect(result).toBe("PT1H30M15S");
  });
});

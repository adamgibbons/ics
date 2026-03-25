import { describe, expect, it } from "vitest";
import { printOrganizer } from "./organizer.prop";

describe("organizer component", () => {
  it("prints a basic ORGANIZER", () => {
    const output = printOrganizer({ mailto: "jsmith@example.com", cn: "John Smith" });
    expect(output).toContain("ORGANIZER;CN=John Smith:mailto:jsmith@example.com\r\n");
  });
});
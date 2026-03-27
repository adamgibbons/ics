import { describe, expect, it } from "vitest";
import { createOrganizer, printOrganizer } from "./organizer.prop";

describe("organizer component", () => {
  it("prints a basic ORGANIZER", () => {
    const organizer = createOrganizer({ mailto: "jsmith@example.com", cn: "John Smith" });
    const output = printOrganizer(organizer);
    expect(output).toContain("ORGANIZER;CN=John Smith:mailto:jsmith@example.com\r\n");
  });
});
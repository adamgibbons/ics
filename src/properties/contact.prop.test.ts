import { describe, expect, it } from "vitest";
import { createContact, printContact } from "./contact.prop";

describe("contact property", () => {
  it("prints a basic CONTACT", () => {
    const contact = createContact({ contact: "John Smith, +1-555-555-5555" });
    const output = printContact(contact);
    expect(output).toContain("CONTACT:John Smith, +1-555-555-5555\r\n");
  });

  it("prints CONTACT with all params", () => {
    const contact = createContact({
      contact: "John Smith, +1-555-555-5555",
      alternativeRepresentation: "http://example.com/contact/john-smith.vcf",
      language: "en-US",
    });
    const output = printContact(contact);
    expect(output).toContain(
      'CONTACT;ALTREP="http://example.com/contact/john-smith.vcf";LANGUAGE=en-US:John Smith, +1-555-555-5555\r\n',
    );
  });
});


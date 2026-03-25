import { describe, expect, it } from "vitest";
import { createTodo, printToDo } from "./todo.component";

describe("todo component", () => {
  it("prints a VTODO block with status", () => {
    const output = printToDo({
      type: "todoc",
      uid: "abc-123",
      status: "COMPLETED",
    });

    expect(output).toBe(
      [
        "BEGIN:VTODO",
        "UID:abc-123",
        "STATUS:COMPLETED",
        "END:VTODO",
        "",
      ].join("\r\n")
    );
  });

  it("prints a VTODO block without status when omitted", () => {
    const output = printToDo({
      type: "todoc",
      uid: "abc-123",
    });

    expect(output).toBe(["BEGIN:VTODO", "UID:abc-123", "END:VTODO", ""].join("\r\n"));
    expect(output).not.toContain("STATUS:");
  });

  it("prints a VTODO block with attendees", () => {
    const output = printToDo({
      type: "todoc",
      uid: "abc-123",
      attendees: [{ mailto: "joecool@example.com" }],
    });
    console.log(output)
    expect(output).toContain("ATTENDEE:mailto:joecool@example.com\r\n");
  });

  it("prints a VTODO block with attendees and status", () => {
    const output = printToDo({
      type: "todoc",
      uid: "20070313T123432Z-456553@example.com",
      // attendees: [{ mailto: "joecool@example.com" }],
      status: "NEEDS-ACTION",
      summary: "Submit Quebec Income Tax Return for 2006",
      class: "CONFIDENTIAL",
      categories: ["FAMILY", "FINANCE"]
    });
    // console.log(output)
    expect(output).toContain([
      'BEGIN:VTODO',
      'UID:20070313T123432Z-456553@example.com',
      // 'DTSTAMP:20070313T123432Z',
      // 'DUE;VALUE=DATE:20070501',
      'SUMMARY:Submit Quebec Income Tax Return for 2006',
      'CLASS:CONFIDENTIAL',
      'CATEGORIES:FAMILY,FINANCE',
      'STATUS:NEEDS-ACTION',
      'END:VTODO'
    ].join("\r\n"));
  });
});


// BEGIN:VTODO
// UID:20070313T123432Z-456553@example.com
// DTSTAMP:20070313T123432Z
// DUE;VALUE=DATE:20070501
// SUMMARY:Submit Quebec Income Tax Return for 2006
// CLASS:CONFIDENTIAL
// CATEGORIES:FAMILY,FINANCE
// STATUS:NEEDS-ACTION
// END:VTODO
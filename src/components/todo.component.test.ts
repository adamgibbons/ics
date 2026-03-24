import { describe, expect, it } from "vitest";
import { createTodo, printToDo } from "./todo.component";

describe("todo component", () => {
  it("prints a VTODO block with status", () => {
    const output = printToDo({
      type: "todoc",
      uid: "abc-123",
      status: "completed",
    });

    expect(output).toBe(
      [
        "BEGIN:VTODO",
        "UID:abc-123",
        "STATUS:completed",
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
});

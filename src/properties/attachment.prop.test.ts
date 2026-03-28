import { describe, expect, it } from "vitest";
import {
  createAttachment,
  printAttachment,
  printAttachments,
} from "./attachment.prop";

describe("attachment property", () => {
  it("prints ATTACH with a URI value", () => {
    const output = printAttachment({
      url: "https://www.example.com/doc.pdf",
    });
    expect(output).toBe("ATTACH:https://www.example.com/doc.pdf\r\n");
  });

  it("prints ATTACH with a CID URI (colons in value)", () => {
    const output = printAttachment({
      url: "CID:jsmith.part3.960817T083000.xyzMail@example.com",
    });
    expect(output).toBe(
      "ATTACH:CID:jsmith.part3.960817T083000.xyzMail@example.com\r\n",
    );
  });

  it("prints ATTACH with FMTTYPE for a URI", () => {
    const output = printAttachment({
      url: "ftp://example.com/pub/reports/r-960812.ps",
      fmtType: "application/postscript",
    });
    expect(output).toBe(
      "ATTACH;FMTTYPE=application/postscript:ftp://example.com/pub/reports/r-960812.ps\r\n",
    );
  });

  it("prints ATTACH for inline BASE64 binary", () => {
    const output = printAttachment({
      binary: "Zm9v",
    });
    expect(output).toBe(
      "ATTACH;ENCODING=BASE64;VALUE=BINARY:Zm9v\r\n",
    );
  });

  it("prints ATTACH for binary with FMTTYPE", () => {
    const output = printAttachment({
      binary: "JVBERi0xLjQK",
      fmtType: "application/pdf",
    });
    expect(output).toBe(
      "ATTACH;ENCODING=BASE64;VALUE=BINARY;FMTTYPE=application/pdf:JVBERi0xLjQK\r\n",
    );
  });

  it("createAttachment normalizes URI shape", () => {
    expect(createAttachment({ url: "https://a.test" })).toEqual({
      url: "https://a.test",
      fmtType: null,
    });
  });

  it("createAttachment normalizes binary shape", () => {
    expect(createAttachment({ binary: "QQ==" })).toEqual({
      binary: "QQ==",
      fmtType: null,
    });
  });

  it("printAttachments joins multiple lines", () => {
    const output = printAttachments([
      { url: "https://a.test" },
      { binary: "Yg==" },
    ]);
    expect(output).toBe(
      "ATTACH:https://a.test\r\nATTACH;ENCODING=BASE64;VALUE=BINARY:Yg==\r\n",
    );
  });
});

export interface CreateAttachmentUriParams {
  url: string;
  fmtType?: string | null;
}

export interface CreateAttachmentBinaryParams {
  binary: string;
  fmtType?: string | null;
}

export type CreateAttachmentParams =
  | CreateAttachmentUriParams
  | CreateAttachmentBinaryParams;

export function createAttachment(attachment: CreateAttachmentParams) {
  if ("binary" in attachment) {
    return {
      binary: attachment.binary,
      fmtType: attachment.fmtType ?? null,
    };
  }
  return {
    url: attachment.url,
    fmtType: attachment.fmtType ?? null,
  };
}

export function printAttachment(props: CreateAttachmentParams): string {
  const attachment = createAttachment(props);
  let formattedResponse = "ATTACH";

  if ("binary" in attachment) {
    formattedResponse += ";ENCODING=BASE64;VALUE=BINARY";
    if (attachment.fmtType) {
      formattedResponse += `;FMTTYPE=${attachment.fmtType}`;
    }
    formattedResponse += `:${attachment.binary}\r\n`;
    return formattedResponse;
  }

  if (attachment.fmtType) {
    formattedResponse += `;FMTTYPE=${attachment.fmtType}`;
  }
  formattedResponse += `:${attachment.url}\r\n`;
  return formattedResponse;
}

export function printAttachments(attachments: CreateAttachmentParams[]) {
  return attachments.map((a) => printAttachment(a)).join("");
}

// Property Name:  ATTACH

// Purpose:  This property provides the capability to associate a
//    document object with a calendar component.

// Value Type:  The default value type for this property is URI.  The
//    value type can also be set to BINARY to indicate inline binary
//    encoded content information.

// Property Parameters:  IANA, non-standard, inline encoding, and value
//    data type property parameters can be specified on this property.
//    The format type parameter can be specified on this property and is
//    RECOMMENDED for inline binary encoded content information.

// Conformance:  This property can be specified multiple times in a
//    "VEVENT", "VTODO", "VJOURNAL", or "VALARM" calendar component with
//    the exception of AUDIO alarm that only allows this property to
//    occur once.

// Description:  This property is used in "VEVENT", "VTODO", and
//    "VJOURNAL" calendar components to associate a resource (e.g.,
//    document) with the calendar component.  This property is used in
//    "VALARM" calendar components to specify an audio sound resource or
//    an email message attachment.  This property can be specified as a
//    URI pointing to a resource or as inline binary encoded content.

//    When this property is specified as inline binary encoded content,
//    calendar applications MAY attempt to guess the media type of the
//    resource via inspection of its content if and only if the media
//    type of the resource is not given by the "FMTTYPE" parameter.  If
//    the media type remains unknown, calendar applications SHOULD treat
//    it as type "application/octet-stream".

// Format Definition:  This property is defined by the following
// notation:

//  attach     = "ATTACH" attachparam ( ":" uri ) /
//               (
//                 ";" "ENCODING" "=" "BASE64"
//                 ";" "VALUE" "=" "BINARY"
//                 ":" binary
//               )
//               CRLF

//  attachparam = *(
//              ;
//              ; The following is OPTIONAL for a URI value,
//              ; RECOMMENDED for a BINARY value,
//              ; and MUST NOT occur more than once.
//              ;
//              (";" fmttypeparam) /
//              ;
//              ; The following is OPTIONAL,
//              ; and MAY occur more than once.
//              ;
//              (";" other-param)
//              ;
//              )

// Example:  The following are examples of this property:

//  ATTACH:CID:jsmith.part3.960817T083000.xyzMail@example.com

//  ATTACH;FMTTYPE=application/postscript:ftp://example.com/pub/
//   reports/r-960812.ps

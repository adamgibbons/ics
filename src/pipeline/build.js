import pickBy from "lodash/pickBy";
import defaultAttributes from "../defaults";

export default function buildEvent(attributes = {}) {
  const {
    title,
    productId,
    method,
    uid,
    sequence,
    start,
    startType,
    duration,
    end,
    description,
    url,
    geo,
    location,
    status,
    categories,
    organizer,
    attendees,
    alarms,
    recurrenceRule,
    created,
    lastModified,
    calName
  } = attributes;

  // fill in default values where necessary
  const output = Object.assign({}, defaultAttributes, attributes);

  // remove undefined values
  const cleanOutput = pickBy(output, value => value !== undefined);

  return cleanOutput;
}

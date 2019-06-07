import pickBy from "lodash/pickBy";
import identity from "lodash/identity";
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
    recurrenceRule
  } = attributes;

  // fill in default values where necessary
  const output = Object.assign({}, defaultAttributes, attributes);

  // remove falsey values
  const cleanOutput = pickBy(output, identity);

  return cleanOutput;
}

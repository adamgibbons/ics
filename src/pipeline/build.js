import { headerDefaults, eventDefaults } from "../defaults";

function removeUndefined(input) {
  return Object.entries(input).reduce(
    (clean, entry) => typeof entry[1] !== 'undefined' ? Object.assign(clean, {[entry[0]]: entry[1]}) : clean,
    {}
  )
}

export function buildHeader(attributes = {}) {
  // fill in default values where necessary
  const output = Object.assign({}, headerDefaults(), attributes);

  return removeUndefined(output)
}

export function buildEvent(attributes = {}) {
  // fill in default values where necessary
  const output = Object.assign({}, eventDefaults(), attributes);

  return removeUndefined(output)
}

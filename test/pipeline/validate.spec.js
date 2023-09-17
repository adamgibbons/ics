import { expect } from 'chai'
import { validateHeaderAndEvent } from '../../src/pipeline'

describe('pipeline.validateHeaderAndEvent', () => {
  it('validates an event', () => {
    const { error, value } = validateHeaderAndEvent({
      uid: '1',
      start: [1997, 10, 1, 22, 30],
      duration: { hours: 1 }
    })
    expect(error).not.to.exist
    expect(value.uid).to.equal('1')
  })
  it('returns an error if the sequence number is too long', () => {
    const { error, value } = validateHeaderAndEvent({
      uid: '1',
      start: [1997, 10, 1, 22, 30],
      duration: { hours: 1 },
      sequence: 3_456_789_123, // bigger than 2,147,483,647
    })
    expect(error).to.exist
  })
  it('returns undefined when passed no event', () => {
    const { error, value } = validateHeaderAndEvent()
    expect(value).to.be.undefined
  })
  it('returns an error when invalid data passed', () => {
    expect(validateHeaderAndEvent(null).error).to.exist
    expect(validateHeaderAndEvent(1).error).to.exist
    expect(validateHeaderAndEvent('foo').error).to.exist
    expect(validateHeaderAndEvent({}).error).to.exist
  })
})

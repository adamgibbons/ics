import { expect } from 'chai'
import { createEvent } from '../src'

const invalidAttributes = { start: [] }
const validAttributes = { start: [2000, 10, 5, 5, 0], duration: { hours: 1 } }

describe('.createEvent', () => {
  it('returns an error or value when not passed a callback', () => {
    const event1 = createEvent(validAttributes)
    const event2 = createEvent(invalidAttributes)

    expect(event1.error).to.be.null
    expect(event1.value).to.be.a('string')
    expect(event2.error).to.exist
  })
  it('returns an error when passed an empty object', (done) => {
    createEvent({}, (error, success) => {
      done()
      expect(error.name).to.equal('ValidationError')
      expect(success).not.to.exist
    })
  })
  it('returns a node-style callback', (done) => {
    createEvent(validAttributes, (error, success) => {
      expect(error).not.to.exist
      expect(success).to.contain('DTSTART:200010')
      done()
    })
  })
})

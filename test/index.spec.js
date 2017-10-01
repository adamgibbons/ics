import { expect } from 'chai'
import { createEvent } from '../src'

describe('ics module', () => {
  describe('.createEvent', () => {
    it('returns an object with an error and value when not passed a callback', () => {
      const attributes = { start: [2000, 10, 5, 5, 0] }
      const { error, value } = createEvent(attributes)

      expect(error).to.be.null
      expect(value).to.be.a('string')
    })
    it('returns a validation error when passed an empty object', (done) => {
      createEvent({}, (error, success) => {
        done()
        expect(error.name).to.equal('ValidationError')
        expect(success).not.to.exist
      })
    })
    it('returns an ics string in a callback', (done) => {
      createEvent({
        start: [2000, 10, 5, 5, 0]
      }, (error, success) => {
        expect(error).not.to.exist
        expect(success).to.contain('DTSTART:200010')
        done()
      })
    })
  })
})

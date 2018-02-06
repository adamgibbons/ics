import { expect } from 'chai'
import { createCalendar } from '../src'
import { createEvent } from '../src'

const invalidAttributes = [{ start: [] }]
const validAttributes = [{ start: [2000, 10, 5, 5, 0], duration: { hours: 1 } }]

describe('.createCalendar', () => {
  it('returns an error or value when not passed a callback', () => {
    const event1 = createCalendar(validAttributes,{productId:"test"})
    const event2 = createCalendar(invalidAttributes,{})
    expect(event1.error).to.be.null
    expect(event1.value).to.be.a('string')
    expect(event2.error).to.exist
  })
  it('returns an error when passed an empty object', (done) => {
    createCalendar({},"test", (error, success) => {
      done()
      expect(error.name).to.equal('ValidationError')
      expect(success).not.to.exist
    })
  })
  it('returns a node-style callback', (done) => {
    createCalendar(validAttributes,{productId:"test"}, (error, success) => {
      expect(error).not.to.exist
      expect(success).to.contain('DTSTART:200010')
      done()
    })
  })
  it('contain PRODID if is passed as property', (done) => {
    createCalendar(validAttributes,{productId:"test"}, (error, success) => {
      expect(error).not.to.exist
      expect(success).to.contain('PRODID:test')
      done()
    })
  })
  it('blank PRODID if is not passed as property', (done) => {
    createCalendar(validAttributes,null, (error, success) => {
      expect(error).not.to.exist
      expect(success).to.contain('PRODID:\r\n')
      done()
    })
  })
})

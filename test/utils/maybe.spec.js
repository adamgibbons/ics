import { expect } from 'chai'
import { maybe } from '../../src/utils'

describe('utils.maybe', () => {  
  it('returns the first argument when truthy', () => {
    expect(maybe(1)).to.equal(1)
    expect(maybe('abc')).to.equal('abc')
  })
  it('returns the second argument when the first is not truthy', () => {
    expect(maybe(null, 1)).to.equal(1)
    expect(maybe(undefined, 'abc')).to.equal('abc')
    expect(maybe(false, 'bar')).to.equal('bar')
    expect(maybe(1, 'abc')).to.equal(1)
  })
})
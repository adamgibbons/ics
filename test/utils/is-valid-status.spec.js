import { expect } from 'chai'
import { isValidStatus } from '../../src/utils'

describe('utils.isValidStatus', () => {
  it('returns false when status isn\'t a string', () => {
    expect(isValidStatus(-1)).to.equal(false)
    expect(isValidStatus([])).to.equal(false)
    expect(isValidStatus({})).to.equal(false)
    expect(isValidStatus(Math)).to.equal(false)
  })
  it('returns false when status is incorrect', () => {
    expect(isValidStatus('happy')).to.equal(false)
  })
  it('returns true when status is enumerated', () => {
    expect(isValidStatus('tentative')).to.equal(true)
  })
})
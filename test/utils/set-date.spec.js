import moment from 'moment'
import { setDate } from '../../src/utils'
import { expect } from 'chai'

describe('utils.setDate', () => {  
  it('defaults to UTC time when no type passed', () => {
    expect(setDate([2017, 7, 16, 22, 30])).to.equal('20170716T223000Z')
  })
  it('sets a local (i.e. floating) time when specified', () => {
    expect(setDate([1998, 1, 18, 23, 0], 'local')).to.contain('199801')
  })
  it('sets a date value when passed only three args', () => {
    expect(setDate([2018, 2, 11])).to.equal('20180211')
  })
})

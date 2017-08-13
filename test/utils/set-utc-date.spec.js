import moment from 'moment'
import { setUTCdate } from '../../src/utils'
import { expect } from 'chai'

describe('utils.setUTCdate', () => {  
  it('defaults to NOW in UTC date-time when no args passed', () => {
    const now = moment().utc().format('YYYYMMDDTHHmm00') + 'Z'
    expect(now).to.equal(setUTCdate())
  })
  it('sets a UTC date-time when passed an array of args', () => {
    expect(setUTCdate([2017, 7, 13, 11, 33]))
      .to.equal('20170813T173300Z')
  })
})
import moment from 'moment'
import { setDateWithUTCtime } from '../../src/utils'
import { expect } from 'chai'

describe('utils.setDateWithUTCtime', () => {  
  it('defaults to NOW in UTC date-time when no args passed', () => {
    const now = moment().utc().format('YYYYMMDDTHHmm00') + 'Z'
    expect(now).to.equal(setDateWithUTCtime())
  })

  it('sets a UTC date-time when passed well-formed args', () => {
    expect(setDateWithUTCtime([2017, 9, 25, 0, 30])).to.equal('20170925T003000Z')
    expect(setDateWithUTCtime([2017, 1, 31])).to.equal('20170131T000000Z')
  })
})

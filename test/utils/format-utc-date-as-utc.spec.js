import dayjs from 'dayjs'
import { formatUTCDateAsUTC } from '../../src/utils'
import { expect } from 'chai'

describe('utils.formatUTCDateAsUTC', () => {  
  it('defaults to NOW in UTC date-time when no args passed', () => {
    const now = dayjs().utc().format('YYYYMMDDTHHmm00') + 'Z'
    expect(now).to.equal(formatUTCDateAsUTC())
  })

  it('sets a UTC date-time when passed well-formed args', () => {
    expect(formatUTCDateAsUTC([2017, 9, 25, 0, 30])).to.equal('20170925T003000Z')
    expect(formatUTCDateAsUTC([2017, 1, 31])).to.equal('20170131T000000Z')
  })
})

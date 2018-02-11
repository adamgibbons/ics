import moment from 'moment'
import { setDateWithUTCtime } from '../../src/utils'
import { expect } from 'chai'

describe('utils.setDateWithUTCtime', () => {  
  it('defaults to NOW in UTC date-time when no args passed', () => {
    const now = moment().utc().format('YYYYMMDDTHHmm00') + 'Z'
    expect(now).to.equal(setDateWithUTCtime())
  })
  it('sets a UTC date-time when passed well-formed args', () => {
    const local = moment([2017, 9, 25, 0, 30])
    const absolute = moment([2017, 9, 25, 0, 30]).utc()
    const offset = local.utcOffset()

    if (offset === 0) {
      expect(setDateWithUTCtime([2017, 10, 25, 0, 30]))
        .to.equal(absolute.format('YYYYMMDDTHHmm00') + 'Z')
    } else {
      let event

      if (Math.sign(offset) === -1) {
        event = moment(local).subtract(offset, 'minutes')
      } else {
        event = moment(local).add(offset, 'minutes')
      }

      expect(setDateWithUTCtime([2017, 10, 25, 0, 30]))
        .to.equal(event.format('YYYYMMDDTHHmm00') + 'Z')
    }
  })
})

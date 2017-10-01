import moment from 'moment'
import { setDateWithUTCtime } from '../../src/utils'
import { expect } from 'chai'

function getUtcOffset () {

}

describe.only('utils.setDateWithUTCtime', () => {  
  it('defaults to NOW in UTC date-time when no args passed', () => {
    const now = moment().utc().format('YYYYMMDDTHHmm00') + 'Z'
    expect(now).to.equal(setDateWithUTCtime())
  })
  xit('sets a UTC date-time when passed an array of args', () => {
    const local = moment([2017, 9, 25, 0, 30])
    const absolute = moment().utc([2017, 9, 25, 0, 30])
    const offset = local.utcOffset()

    if (offset === 0) {
      expect(setDateWithUTCtime([2017, 9, 25, 0, 30]))
        .to.equal(moment().utc().format('YYYYMMDDTHHmm00') + 'Z')
    } else {

      let event

      if (Math.sign(offset) === -1) {
        event = moment(local).subtract(offset, 'minutes')
        // console.log(absolute.subtract(offset, 'minutes'))
        // console.log(event)
      } else {
        event = moment(local).add(offset, 'minutes')
      }

      expect(setDateWithUTCtime([2017, 9, 25, 0, 30]))
        .to.equal(event.format('YYYYMMDDTHHmm00') + 'Z')
    }
  })
})

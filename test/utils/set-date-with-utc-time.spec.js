import { formatDate, formatDateUTC } from '../../src/utils/date';
import { setDateWithUTCtime } from '../../src/utils'
import { expect } from 'chai'

describe('utils.setDateWithUTCtime', () => {  
  it('defaults to NOW in UTC date-time when no args passed', () => {
    const now = formatDateUTC(new Date())
    expect(now).to.equal(setDateWithUTCtime())
  })
  it('sets a UTC date-time when passed well-formed args', () => {
    const args = [2017, 9, 25, 0, 30]
    const local = new Date(args[0], args[1] - 1, ...args.slice(2))
    const offset = local.getTimezoneOffset()

    if (offset === 0) {
      expect(setDateWithUTCtime(args)).to.equal(formatDate(local) + 'Z')
    } else {
      const event = new Date(local + offset * 3.6e6)

      expect(setDateWithUTCtime(args)).to.equal(formatDate(event) + 'Z')
    }
  })
})

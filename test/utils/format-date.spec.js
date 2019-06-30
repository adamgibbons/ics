import moment from 'moment'
import { formatDate } from '../../src/utils'
import { expect } from 'chai'

describe('utils.formatDate', () => {  
  it('defaults to local time input and UTC time output when no type passed', () => {
    const now = moment([2017, 7-1, 16, 22, 30]).utc().format('YYYYMMDDTHHmm00')
    expect(formatDate([2017, 7, 16, 22, 30])).to.equal(now+'Z')
  })
  it('sets a local (i.e. floating) time when specified', () => {
    expect(formatDate([1998, 1, 18, 23, 0], 'local')).to.equal('19980118T230000')
  })
  it('sets a date value when passed only three args', () => {
    expect(formatDate([2018, 2, 11])).to.equal('20180211')
  })
})

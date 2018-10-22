// FORM #1: DATE WITH LOCAL TIME

import { formatDate } from '../../src/utils/date';
import { setDateWithLocalTime } from '../../src/utils'
import { expect } from 'chai'

describe('utils.setDateWithLocalTime', () => {  
  it('exists', () => {
    expect(setDateWithLocalTime).to.exist
  })
  xit('sets a DATE-TIME value to NOW when passed nothing', () => {
    const now = formatDate(new Date());
    expect(setDateWithLocalTime()).to.equal(now)
  })
  xit('sets a DATE-TIME value when passed args', () => {
    expect(setDateWithLocalTime([1998, 1, 18, 23, 0]))
      .to.equal('19980118T230000')
  })
})

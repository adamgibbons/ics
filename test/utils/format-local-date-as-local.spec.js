// FORM #1: DATE WITH LOCAL TIME

import dayjs from 'dayjs'
import { formatLocalDateAsLocal } from '../../src/utils'
import { expect } from 'chai'

describe('utils.formatLocalDateAsLocal', () => {  
  it('exists', () => {
    expect(formatLocalDateAsLocal).to.exist
  })
  it('sets a DATE-TIME value to NOW when passed nothing', () => {
    const now = dayjs().format('YYYYMMDDTHHmmss')
    expect(formatLocalDateAsLocal()).to.equal(now)
  })
  it('sets a DATE-TIME value when passed args', () => {
    expect(formatLocalDateAsLocal([1998, 1, 18, 23, 9, 59]))
      .to.equal('19980118T230959')
  })
})

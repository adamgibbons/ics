import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

import { formatDate } from '../../src/utils'
import { expect } from 'chai'

describe('utils.formatDate', () => {
  it('defaults to local time input and UTC time output when no type passed', () => {
    const now = dayjs(new Date(2017, 7-1, 16, 22, 30, 35)).utc().format('YYYYMMDDTHHmmss')
    expect(formatDate([2017, 7, 16, 22, 30, 35])).to.equal(now+'Z')
  })
  it('sets a local (i.e. floating) time when specified', () => {
    expect(formatDate([1998, 6, 18, 23, 0], 'local', 'local')).to.equal('19980618T230000')
  })
  it('sets a date value when passed only three args', () => {
    expect(formatDate([2018, 2, 11])).to.equal('20180211')
  })
  it('defaults to NOW in UTC date-time when no args passed', () => {
    const now = dayjs().utc().format('YYYYMMDDTHHmmss') + 'Z'
    expect(formatDate(undefined, 'utc')).to.equal(now)
  })
  it('sets a UTC date-time when passed well-formed args', () => {
    expect(formatDate([2017, 9, 25, 0, 30], 'utc', 'utc')).to.equal('20170925T003000Z')
    expect(formatDate([2017, 1, 31], 'utc','utc')).to.equal('20170131')
  })
  it('sets a local DATE-TIME value to NOW when passed nothing', () => {
    const now = dayjs().format('YYYYMMDDTHHmmss')
    expect(formatDate(undefined, 'local', 'local')).to.equal(now)
  })
  it('sets a local DATE-TIME value when passed args', () => {
    expect(formatDate([1998, 1, 18, 23, 9, 59], 'local', 'local'))
      .to.equal('19980118T230959')
  })
  it('sets a UTC date-time when passed a unix timestamp', () => {
    expect(formatDate(1694940441442)).to.equal('20230917T084721Z')
  })
  it('returns a string as is', () => {
    expect(formatDate('20230917T084721Z')).to.equal('20230917T084721Z')
  })
})

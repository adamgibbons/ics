import moment from 'moment'
import { setDate } from '../../src/utils'
import { expect } from 'chai'

describe('utils.setDate', () => {  
  xit('defaults to UTC time when no type passed', () => {
    expect(setDate([2017, 7, 16, 22, 30])).to.equal('20170817T043000Z')
  })
  it('sets a local (i.e. floating) time when specified', () => {
    expect(setDate([1998, 0, 18, 23, 0], 'local')).to.equal('19980118T230000')
  })
})

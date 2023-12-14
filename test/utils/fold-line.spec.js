import { expect } from 'chai'
import { foldLine } from '../../src/utils'

describe('utils.foldLine', () => {
  it('fold a line with emoji', () => {
    const line = 'some text some text some text some text some text some text some text abc 🍅🍅🍅🍅'
    expect(foldLine(line)).to.equal('some text some text some text some text some text some text some text abc 🍅\r\n\t🍅🍅🍅')
  })
})
import { expect } from 'chai'
import { foldLine } from '../../src/utils'

const octets = (text) => new TextEncoder().encode(text).length

describe('utils.foldLine', () => {
  it('fold a line with emoji', () => {
    const line = 'some text some text some text some text some text some text some text abc 🍅🍅🍅🍅'
    expect(foldLine(line)).to.equal('some text some text some text some text some text some text some text abc \r\n\t🍅🍅🍅🍅')
  })

  it('does not fold a line of 75 octets', () => {
    const line = 'a'.repeat(75)
    expect(foldLine(line)).to.equal(line)
  })

  it('folds ASCII text after 75 octets, then every 74', () => {
    const line = 'a'.repeat(75 + 74 + 1)
    expect(foldLine(line)).to.equal(`${'a'.repeat(75)}\r\n\t${'a'.repeat(74)}\r\n\ta`)
  })

  it('keeps every folded line within 75 octets for multi-byte text', () => {
    const line = 'SUMMARY:' + 'ü日本🍅'.repeat(40)
    const folded = foldLine(line)
    for (const part of folded.split('\r\n')) {
      expect(octets(part)).to.be.at.most(75)
    }
    expect(folded.split('\r\n\t').join('')).to.equal(line)
  })
})

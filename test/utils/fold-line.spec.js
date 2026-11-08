import { expect } from 'chai'
import { foldLine } from '../../src/utils'

describe('utils.foldLine', () => {
  [
    {
      name: 'fold a line with emoji', 
      line: 'some text some text some text some text some text some text some text🍅🍅🍅🍅',
      expected: 'some text some text some text some text some text some text some text🍅\r\n\t🍅🍅🍅'
    },
    {
      name: 'fold a line with emoji that is multiple characters',
      line: 'some text some text some text some text some text some text some abc abc👨‍👩‍👧‍👦',
      expected: 'some text some text some text some text some text some text some abc abc\r\n\t👨‍👩‍👧‍👦',
    },
    {
      name: 'folds when a multi-byte character pushes past the 75-byte limit',
      line: 'A'.repeat(74) + 'é',
      expected: 'A'.repeat(74) + '\r\n\t' + 'é'
    },
    {
      name: 'folds multiple lines',
      // '🍅' = 4 octets, 'é' = 2 octets, '👨‍👩‍👧‍👦' = 25 octets
      line: 'A'.repeat(40) + 'é☀🍅🍅🍅👨‍👩‍👧‍👦🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅é☀👨‍👩‍👧‍👦',
      expected: 'A'.repeat(40) + 'é☀🍅🍅🍅\r\n\t👨‍👩‍👧‍👦🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅\r\n\té☀👨‍👩‍👧‍👦'
    }
  ].forEach(({ name, line, expected }) => {
    it(name, () => {
      expect(foldLine(line)).to.equal(expected)
    })
  })
})
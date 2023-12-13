import { expect } from 'chai';
import { encodeParamValue } from '../../src/utils'

describe('utils.encodeParamValue', () => {
  it('encodes correctly', () => {
    expect(encodeParamValue('test')).to.equal(`"test"`)
    expect(encodeParamValue('a"b"c')).to.equal(`"a\\"b\\"c"`)
  });
})

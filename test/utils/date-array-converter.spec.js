import { dateArrayConverter } from '../../src/utils'
import { expect } from 'chai'

describe('utils.dateArrayConverter', () => {
  it('format now into date array', () => {
    const input = new Date();
    const output = dateArrayConverter(input);
    expect(Array.isArray(output)).to.be.true;
    expect(output[0]).to.equal(input.getUTCFullYear());
    expect(output[4]).to.equal(input.getUTCMinutes());
  })
  it('format specifc time into date array', () => {
    const input = new Date(2020, 3, 3, 0, 10);
    const output = dateArrayConverter(input);
    expect(Array.isArray(output)).to.be.true;
    expect(new Date(Date.UTC(...output)).toUTCString()).to.equal(input.toUTCString());
  })
  it('format specifc time with seconds into date array - expect to not equal', () => {
    const input = new Date(2020, 3, 3, 0, 10, 10);
    const output = dateArrayConverter(input);
    expect(Array.isArray(output)).to.be.true;
    expect(new Date(Date.UTC(...output)).toUTCString()).to.not.equal(input.toUTCString());
  })
})

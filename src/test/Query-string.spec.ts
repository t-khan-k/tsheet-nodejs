
import * as chai from 'chai';
const expect = chai.expect;

import { qs } from '../helper/Query-string';

describe('QueryString', function () {
  it('Output string', function() {
    expect(qs.stringify({someObj: 'someVal'})).to.be.a('string');
  });

  it('Stringify 1 property', function() {
    expect(qs.stringify({someObj: 'someVal'})).to.be.equal('someObj=someVal');
  });

  it('Stringify 2 properties', function() {
    expect(qs.stringify({one: 'oneVal', two: 'twoVal'})).to.be.equal('one=oneVal&two=twoVal');
  });
});
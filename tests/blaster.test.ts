import { expect } from 'chai';
import 'mocha';
import { NodeBlaster } from '../dist/index';


describe('test get worker count', () => {
  it('should return 3', () => {
    let inTest = new NodeBlaster('./process.js', {maxWorkers: 3})
    expect(inTest.count()).to.equal(3);
  });
});
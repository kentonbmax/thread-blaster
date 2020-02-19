import "jasmine";
import { NodeBlaster } from '../dist/node-blaster';

describe('test node blaster', () => {
  it('worker should return 3', () => {
    let inTest = new NodeBlaster('./test.js', {maxWorkers: 3})
    expect(inTest.count()).toBe(3);
  });

  it('worker should receive messages', () => {
    let data = '12345';
    let inTest = new NodeBlaster('./test.js', {maxWorkers: 3})
    inTest.send({name: '12345'});
    process.on('message', msg => {
      expect(msg.name).toBe('12345'); 
    })
  });

  it('worker should stop', () => {
    let data = '12345';
    let inTest = new NodeBlaster('./test.js', {maxWorkers: 3})
    inTest.stop();
    expect(inTest.count()).toBe(0);
  });
});
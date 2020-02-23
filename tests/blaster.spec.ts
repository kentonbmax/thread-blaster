import "jasmine";
import { NodeBlaster } from '../src/index';


let inTest: NodeBlaster;

describe('test node blaster', () => {

  beforeEach(async () => {
    inTest = new NodeBlaster('./test.js', {maxWorkers: 3});
  })

  afterEach(async () => {
    inTest = null;
  })

  it('worker should default to 1 worker', async () => {
    let myTest = new NodeBlaster('./test.js');
    expect(myTest.count()).toBe(1);
    expect(myTest._maxWorkers).toBe(1);
  });

  it('worker should return 3', async () => {
    expect(inTest.count()).toBe(3);
  });

  it('worker should receive messages', async () => {
    inTest.send({name: '12345'});
    process.on('message', msg => {
      expect(msg.name).toBe('12345'); 
    })
  });

  it('worker should fail receive messages when stopped', async () => {
    inTest.stop();
    expect(() => {inTest.send({name: '12345'})})
      .toThrow(new Error('Failed to send data to process'))
  });

  it('worker should stop and remove workers', async () => {
    inTest.stop();
    expect(inTest.count()).toBe(0);
  });

  it('worker should stop but not remove workers', async () => {
    inTest.stop(false);
    expect(inTest.count()).toBe(3);
  });
});
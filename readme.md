# Node Blaster

[![kentonbmax](https://circleci.com/gh/kentonbmax/node-blaster.svg?style=svg)](https://circleci.com/gh/circleci/circleci-docs)

## Description
> Creates child processes using nodejs files to distribute work. Utilizes the process.send to pipe data to the workers. 
> Workers run in strict mode. 

## Setup 

Installation
`npm install node-blaster -s`

Options
1. `maxWorkers` defaults to 1, use your pysical cores as a guide where main thread is running this library. (physical cores -1)

### Use
> Using this library requires a js file that can run as a seperate process. 

### hellowork.js

```
// do work
console.log(`Hello World of work ${new Date()})
```

### index.js
```
const { NodeBlaster } = require('node-blaster);

//create the instance
const blaster = new NodeBlaster('./hellowork.js, {maxWorkers: 3});

    /// do other work

// stop all child processes
blaster.stop();
```

## Uses
* Writing lots of files. (use streams)
* Making any self contained node file/process a worker process. 



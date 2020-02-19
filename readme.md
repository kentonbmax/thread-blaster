# Node Blaster

## Description
> A helper that evenly run nodejs files as a seperate process to distribute work. Utilizes the process.send to pipe data to the workers. 
> Workers run in strict mode for your safety. 

## Setup 

Installation
`npm install node-blaster -s`

Options
1. `maxWorkers` defaults to 1, use your pysical cores as a guide where main thread is running this library. (physical cores -1)

### Use
> Using this library requires a js file that can run as a seperate process. 

### hellowork.js

```
console.log(`Hello World of work ${new Date()})
```

### index.js
```
const { NodeBlaster } = require('node-blaster);

//create the instance
const blaster = new NodeBlaster('./hellowork.js, {maxWorkers: 3});

blaster.stop();
```

## Uses
* Writing lots of files. (use streams)
* Making any self contained node file/process a worker process. 



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
const fs = require('fs');
console.log(`Hello World of work ${new Date()})

process.on('message', (msg) =>{
    fs.writeFileSync(msg.path, JSON.stringify(msg.data));
})
```

### index.js
```
const { NodeBlaster } = require('node-blaster);

//create the instance
const blaster = new NodeBlaster('./hellowork.js, {maxWorkers: 3});

// write to 3 files
blaster.send({path: 'file1.text', data : {"Value": "JSON data3"}});
blaster.send({path: 'file2.text', data : {"Value": "JSON data2"}});
blaster.send({path: 'file3.text', data : {"Value": "JSON data1"}});

// write again

blaster.send({path: 'file4.text', data : {"Value": "JSON data3"}});
blaster.send({path: 'file5.text', data : {"Value": "JSON data2"}});
blaster.send({path: 'file6.text', data : {"Value": "JSON data1"}});

// stop all child processes
blaster.stop();
```

## Uses
* Writing lots of files. (use streams)
* Making any self contained node file/process a worker process. 
* melting CPU's :)



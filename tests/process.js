console.log('test starting')

// 2 way message for testing
process.on('message', msg => {
    console.log(JSON.stringify(msg));
    process.send(msg);
})


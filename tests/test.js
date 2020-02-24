'use strict';

module.exports = class TestJs {
    constructor(){
        message = '';
        process.on('message', (msg) => {
            console.log(JSON.stringify(msg));
            process.send(msg);
            this.message = msg.name;
        });
    }
}

var testjs = new TestJs();

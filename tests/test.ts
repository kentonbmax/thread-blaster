
export class Testjs {
    constructor(){
        // 2 way message for testing
        process.on('message', msg => {
            console.log(JSON.stringify(msg));
            process.send(msg);
        }) 
    }
}





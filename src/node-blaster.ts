import { fork } from 'child_process';

interface IOptions {
    maxWorkers: number
}

export class NodeBlaster{

    private _workers:any[] = [];
    readonly _maxWorkers: number = 1;
    readonly _processFileName: string;
    readonly _args?: string[] = [];
    readonly _execArgs?: string[];

    public constructor(
        processFileName: string, 
        options: IOptions = {maxWorkers : 1}, 
        execArgs: string[] = [
            '--use-strict'
        ]) {
            this._maxWorkers = options.maxWorkers ? options.maxWorkers : 1;
            this._processFileName = processFileName;
            this._execArgs = execArgs;
            this.init();
    }

    count(): number{
        return this._workers.length;
    }

    // Kills all current workers. 
    stop(){
        if(this._workers && this._workers.length > 0) {
            this._workers.forEach( worker => {
                worker.kill();
            })
        }
    }

    init(){

        for(var i = 0; i < this._maxWorkers; i++){
            this._workers.push(fork(this._processFileName, this._args, {
                execArgv: this._execArgs  // script.js will be executed in strict mode
            }));
        }
    }

    // Must be same structure as data will be send in random
    send(data: any){
        try {
            var rando  = Math.floor(Math.random() * Math.floor(this._maxWorkers));
            this._workers[rando -1].send(data);
        } catch (error) {
            throw new Error('Failed to send data to process');
        }
    }
}
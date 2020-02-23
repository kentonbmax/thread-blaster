import { fork, ChildProcess } from 'child_process';

interface IOptions {
    maxWorkers: number
}

export class NodeBlaster{

    private _workers: ChildProcess[] = [];
    readonly _maxWorkers: number;
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
    stop(removeWorker = true){
        if(this._workers && this._workers.length > 0) {
            for(var i = 0; i < this._maxWorkers; i++){
                const worker: ChildProcess = this._workers[i];
                worker.kill()
            };

            if(removeWorker){
                this._workers.length = 0;
            }
        };
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
        var rando  = Math.floor(Math.random() * Math.floor(this._maxWorkers));
        if(this._workers[rando]){
            this._workers[rando].send(data);
        } else {
            throw new Error('Failed to send data to process');
        }
    }
}
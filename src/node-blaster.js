"use strict";
exports.__esModule = true;
var child = require('child_process');
var NodeBlaster = /** @class */ (function () {
    function NodeBlaster(processFileName, options, args, execArgs) {
        this._workers = [];
        this._maxWorkers = 1;
        this._execArgs = [
            '--use-strict'
        ];
        this._maxWorkers = options.maxWorkers ? options.maxWorkers : 1;
        this._processFileName = processFileName;
        this._args = args;
        this._execArgs = execArgs;
        this.init();
    }
    Object.defineProperty(NodeBlaster.prototype, "count", {
        get: function () {
            return this._workers.length;
        },
        enumerable: true,
        configurable: true
    });
    // Kills all current workers. 
    NodeBlaster.prototype.stop = function () {
        if (this._workers && this._workers.length > 0) {
            this._workers.forEach(function (worker) {
                worker.kill();
            });
        }
    };
    NodeBlaster.prototype.init = function () {
        for (var i = 0; i < this._maxWorkers; i++) {
            this._workers.push(child.fork(this._processFileName, this._args, {
                execArgv: this._execArgs // script.js will be executed in strict mode
            }));
        }
    };
    // Must be same structure as data will be send in random
    NodeBlaster.prototype.send = function (data) {
        try {
            var rando = Math.floor(Math.random() * Math.floor(this._maxWorkers));
            this._workers[rando - 1].send(data);
        }
        catch (error) {
            throw new Error('Failed to send data to process');
        }
    };
    return NodeBlaster;
}());
exports["default"] = NodeBlaster;

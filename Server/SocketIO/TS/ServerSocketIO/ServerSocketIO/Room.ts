import nodeSchedule = require("node-schedule");

export namespace PackageRoom {
    export interface BaseRoom {
        destroy();
    }

    export class Room implements BaseRoom {

        private _callTime: nodeSchedule.Job;
        private _callSchedule: nodeSchedule.Job;
        private _callSchedule0: any;

        public _roomId: number;

        constructor(roomId: number) {
            this._roomId = roomId;
        }

        public destroy() {

            this.destroyCallTime();
            this.destroyCallSchedule();
            this.destroyCallSchedule0();
        }

        private destroyCallTime() {
            if (this._callTime !== undefined) {
                this._callTime.cancel();
            }
            this._callTime = undefined;
        }
        public startTime(callBack: any, time: Date) {
            this.destroyCallTime();
            this._callTime = nodeSchedule.scheduleJob(time, function () {
                callBack();
            });
        }

        private destroyCallSchedule() {
            if (this._callSchedule !== undefined) {
                this._callSchedule.cancel();
            }
            this._callSchedule = undefined;
        }
        public startSchedule(callBack: any, timeSec: number) {
            this.destroyCallSchedule();
            this._callSchedule = nodeSchedule.scheduleJob("*/"+timeSec+" * * * * *", function () {
                callBack();
            });
        }

        private destroyCallSchedule0() {
            if (this._callSchedule0 !== undefined) {
                clearInterval(this._callSchedule0);
            }
            this._callSchedule0 = undefined;
        }
        public startSchedule0(callBack: any, timeMSec: number) {
            this.destroyCallSchedule0();
            this._callSchedule0 = setInterval(callBack, timeMSec);
        }
    }

}
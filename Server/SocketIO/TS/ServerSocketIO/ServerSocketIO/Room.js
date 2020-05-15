"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodeSchedule = require("node-schedule");
var PackageRoom;
(function (PackageRoom) {
    class Room {
        constructor(roomId) {
            this._roomId = roomId;
        }
        destroy() {
            this.destroyCallTime();
            this.destroyCallSchedule();
            this.destroyCallSchedule0();
        }
        destroyCallTime() {
            if (this._callTime !== undefined) {
                this._callTime.cancel();
            }
            this._callTime = undefined;
        }
        startTime(callBack, time) {
            this.destroyCallTime();
            this._callTime = nodeSchedule.scheduleJob(time, function () {
                callBack();
            });
        }
        destroyCallSchedule() {
            if (this._callSchedule !== undefined) {
                this._callSchedule.cancel();
            }
            this._callSchedule = undefined;
        }
        startSchedule(callBack, timeSec) {
            this.destroyCallSchedule();
            this._callSchedule = nodeSchedule.scheduleJob("*/" + timeSec + " * * * * *", function () {
                callBack();
            });
        }
        destroyCallSchedule0() {
            if (this._callSchedule0 !== undefined) {
                clearInterval(this._callSchedule0);
            }
            this._callSchedule0 = undefined;
        }
        startSchedule0(callBack, timeMSec) {
            this.destroyCallSchedule0();
            this._callSchedule0 = setInterval(callBack, timeMSec);
        }
    }
    PackageRoom.Room = Room;
})(PackageRoom = exports.PackageRoom || (exports.PackageRoom = {}));
//# sourceMappingURL=Room.js.map
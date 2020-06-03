"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PackageClient;
(function (PackageClient) {
    class Client {
        destroy() {
            this._room = undefined;
        }
        setPos(state, direction, x, y, z) {
            this._state = state;
            this._direction = direction;
            this._pxPrev = this._px;
            this._pyPrev = this._py;
            this._pzPrev = this._pz;
            this._px = x;
            this._py = y;
            this._pz = z;
        }
        isPosChange() {
            if (this._px === undefined) {
                return false;
            }
            var result = !(this._pxPrev === this._px &&
                this._pyPrev === this._py &&
                this._pzPrev === this._pz);
            this._pxPrev = this._px;
            this._pyPrev = this._py;
            this._pzPrev = this._pz;
            return result;
        }
    }
    PackageClient.Client = Client;
})(PackageClient = exports.PackageClient || (exports.PackageClient = {}));
//# sourceMappingURL=Client.js.map
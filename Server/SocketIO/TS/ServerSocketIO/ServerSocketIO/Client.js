"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PackageClient;
(function (PackageClient) {
    class Client {
        /*
        private _pxPrev: number;
        private _pyPrev: number;
        private _pzPrev: number;
        */
        destroy() {
            this._room = undefined;
        }
        setPos(req) {
            /*
                if (this._req !== undefined) {
                    this._pxPrev = this._req.px;
                    this._pyPrev = this._req.py;
                    this._pzPrev = this._req.pz;
                }
                */
            this._req = req;
        }
    }
    PackageClient.Client = Client;
})(PackageClient = exports.PackageClient || (exports.PackageClient = {}));
//# sourceMappingURL=Client.js.map
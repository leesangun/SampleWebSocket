import { PackageRoom } from "./Room"; 
import { PackageProtocol } from "./Protocol";
export namespace PackageClient { 
    export interface BaseClient {

    }

    export class Client implements BaseClient {
        public _room: PackageRoom.Room;
        public _roomId: number; //join이 되고 매칭이 안되었을 때 사용
        public _nickname: string;

        public _req: PackageProtocol.ReqStatePlayer;
        /*
        private _pxPrev: number;
        private _pyPrev: number;
        private _pzPrev: number;
        */

        public destroy() {
            this._room = undefined;
        }

        public setPos(req: PackageProtocol.ReqStatePlayer) {
        /*
            if (this._req !== undefined) {
                this._pxPrev = this._req.px;
                this._pyPrev = this._req.py;
                this._pzPrev = this._req.pz;
            }
            */

            this._req = req;

        }
        /*
        public isPosChange(): boolean {
            if (this._req === undefined) {
                return false;
            }

            var result = !(
                this._pxPrev === this._req.px &&
                this._pyPrev === this._req.py &&
                this._pzPrev === this._req.pz
            );
            

            this._pxPrev = this._req.px;
            this._pyPrev = this._req.py;
            this._pzPrev = this._req.pz;

            return result;
        }
        */
    }


}

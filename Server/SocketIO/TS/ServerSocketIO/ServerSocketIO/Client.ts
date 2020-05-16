import { PackageRoom } from "./Room"; 
export namespace PackageClient { 
    export interface BaseClient {

    }

    export class Client implements BaseClient {
        public _room: PackageRoom.Room;
        public _roomId: number; //join이 되고 매칭이 안되었을 때 사용
        public _nickname: string;

        public _px: number;
        public _py: number;
        public _pz: number;

        private _pxPrev: number;
        private _pyPrev: number;
        private _pzPrev: number;

        public _state: number;


        public destroy() {
            this._room = undefined;
        }

        public setPos(state: number, x: number, y: number, z: number) {
            this._state = state;

            this._pxPrev = this._px;
            this._pyPrev = this._py;
            this._pzPrev = this._pz;

            this._px = x;
            this._py = y;
            this._pz = z;
        }

        public isPosChange(): boolean {
            if (this._px === undefined) {
                return false;
            }

            var result = !(
                this._pxPrev === this._px &&
                this._pyPrev === this._py &&
                this._pzPrev === this._pz
            );


            this._pxPrev = this._px;
            this._pyPrev = this._py;
            this._pzPrev = this._pz;

            return result;
        }
    }


}

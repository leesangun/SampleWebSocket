import { PackageRoom } from "./Room"; 
export namespace PackageClient { 
    export interface BaseClient {

    }

    export class Client implements BaseClient {
        public _room: PackageRoom.Room;

        public destroy() {
            this._room = undefined;
        }
    }


}

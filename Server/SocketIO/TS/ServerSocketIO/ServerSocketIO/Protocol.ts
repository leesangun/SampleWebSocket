export namespace PackageProtocol {
    export interface ReqMessage {
        username: string;
        content: string;
    }

    export class ResMessage {
        username: string;
        content: string;
    }
    export let resMessage: ResMessage = new ResMessage();


    export interface ReqMatch {
        nickname: string;
    }

    export class ResMatch {
        users: any[] = [];
    }
    export let resMatch: ResMatch = new ResMatch();

    export class ResMatchWait {
        count_user: number;
    }
    export let resMatchWait: ResMatchWait = new ResMatchWait();

    export interface ReqStatePlayer {
        state:number, //0 move  1 stop
        px: number,
        py: number,
        pz: number,
    }

    export class ResStateEnemy {
        states: any[] = [];
    }
    export let resStateEnemy: ResStateEnemy = new ResStateEnemy();

    export class ResDisconnectOpp {
        nickname: string;
    }
    export let resDisconnectOpp: ResDisconnectOpp = new ResDisconnectOpp();
}
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
        server_time: number;
        users: any[] = [];
    }
    export let resMatch: ResMatch = new ResMatch();

    export class ResMatchWait {
        count_user: number;
    }
    export let resMatchWait: ResMatchWait = new ResMatchWait();

    export interface ReqStatePlayer {
        state: number, //0 start 1 move  2 stop
        direction:number,
        px: number,
        py: number,
        pz: number,
        //방향 액션시점시간 속도
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
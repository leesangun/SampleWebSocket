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

    }

    export class ResMatch {

    }
    export let resMatch: ResMatch = new ResMatch();

    export class ResMatchWait {
        count_user: number;
    }
    export let resMatchWait: ResMatchWait = new ResMatchWait();
}
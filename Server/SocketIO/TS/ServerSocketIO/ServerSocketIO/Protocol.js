"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PackageProtocol;
(function (PackageProtocol) {
    class ResMessage {
    }
    PackageProtocol.ResMessage = ResMessage;
    PackageProtocol.resMessage = new ResMessage();
    class ResMatch {
        constructor() {
            this.users = [];
        }
    }
    PackageProtocol.ResMatch = ResMatch;
    PackageProtocol.resMatch = new ResMatch();
    class ResMatchWait {
    }
    PackageProtocol.ResMatchWait = ResMatchWait;
    PackageProtocol.resMatchWait = new ResMatchWait();
    class ResStateEnemy {
        constructor() {
            this.states = [];
        }
    }
    PackageProtocol.ResStateEnemy = ResStateEnemy;
    PackageProtocol.resStateEnemy = new ResStateEnemy();
    class ResDisconnectOpp {
    }
    PackageProtocol.ResDisconnectOpp = ResDisconnectOpp;
    PackageProtocol.resDisconnectOpp = new ResDisconnectOpp();
})(PackageProtocol = exports.PackageProtocol || (exports.PackageProtocol = {}));
//# sourceMappingURL=Protocol.js.map
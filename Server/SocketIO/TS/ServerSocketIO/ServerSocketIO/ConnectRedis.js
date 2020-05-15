"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redis = require("redis");
let redisClient = redis.createClient(6379, "127.0.0.1");
//redisClient.auth("password",callback);
class ConnectRedis {
    static getInstance() {
        if (!ConnectRedis._instance) {
            ConnectRedis._instance = new ConnectRedis();
        }
        return ConnectRedis._instance;
    }
    get(callback, key) {
        redisClient.get(key, (err, reply) => {
            callback(reply);
        });
    }
    set(key, value) {
        redisClient.set(key, value);
    }
}
exports.ConnectRedis = ConnectRedis;
//# sourceMappingURL=ConnectRedis.js.map
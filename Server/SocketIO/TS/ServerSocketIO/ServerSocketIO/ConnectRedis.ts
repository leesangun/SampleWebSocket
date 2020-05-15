import redis = require('redis');


let redisClient: redis.RedisClient = redis.createClient(6379, "127.0.0.1");
//redisClient.auth("password",callback);
export class ConnectRedis {
    private static _instance: ConnectRedis;
    public static getInstance(): ConnectRedis {
    	if (!ConnectRedis._instance) {
        	ConnectRedis._instance = new ConnectRedis();
        }
        return ConnectRedis._instance;
    }

    public get(callback:any,key:string){
         redisClient.get(key, (err, reply) => {
             callback(reply);
         });
    }

    public set(key:string,value:string){
        redisClient.set(key,value);
    }
}
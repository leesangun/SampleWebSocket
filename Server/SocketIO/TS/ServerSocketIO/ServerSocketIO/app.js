"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socketIO = require("socket.io");
const Protocol_1 = require("./Protocol");
const Client_1 = require("./Client");
const Room_1 = require("./Room");
//npm install --save-dev typescript ts-node
//npm install --save typescript socket.io
//node_modules\.bin\ts-node app.ts
//node_modules/.bin/tsc app.ts
//npm i node-schedule --save
//npm install --save @types/node-schedule
//npm install --save @types/redis
//npm install redis --save
/*
ConnectRedis.getInstance().set("key0", "value0");
console.log(ConnectRedis.getInstance().get(
    function (reply) {
        console.log(reply);
    },
    "key0"
));
*/
let io = socketIO.listen(3000);
var countRoom = 0;
io.on("connection", (socketClient) => {
    console.log("connection");
    socketClient.on("disconnect", () => {
        console.log("disconnect");
        if (socketClient.clientObject._roomId !== undefined) {
            if (socketClient.clientObject._room !== undefined) {
                socketClient.leave(socketClient.clientObject._room._roomId);
                /*
                if (
                    io.sockets.adapter.rooms[socketClient.clientObject._room._roomId] !== undefined &&
                    io.sockets.adapter.rooms[socketClient.clientObject._room._roomId].length === 0
                )
                {
                    socketClient.clientObject._room.destroy();
                    delete socketClient.clientObject._room;
                }
                */
                if (io.sockets.adapter.rooms[socketClient.clientObject._room._roomId] === undefined) {
                    socketClient.clientObject._room.destroy();
                    delete socketClient.clientObject._room;
                }
                else {
                    Protocol_1.PackageProtocol.resDisconnectOpp.nickname = socketClient.clientObject._nickname;
                    io.sockets.in(socketClient.clientObject._room._roomId).emit('ResDisconnectOpp', Protocol_1.PackageProtocol.resDisconnectOpp);
                }
            }
            else if (io.sockets.adapter.rooms[socketClient.clientObject._roomId] !== undefined) {
                Protocol_1.PackageProtocol.resMatchWait.count_user = io.sockets.adapter.rooms[socketClient.clientObject._roomId].length;
                io.sockets.in(countRoom).emit('ResMatchWait', Protocol_1.PackageProtocol.resMatchWait);
            }
        }
        socketClient.clientObject.destroy();
        delete socketClient.clientObject;
    });
    socketClient.clientObject = new Client_1.PackageClient.Client();
    socketClient.on("ReqMatch", (req) => {
        console.log(req);
        socketClient.clientObject._nickname = req.nickname;
        socketClient.clientObject._roomId = countRoom;
        socketClient.join(countRoom);
        if (io.sockets.adapter.rooms[countRoom].length == 3) {
            var room = new Room_1.PackageRoom.Room(countRoom);
            var keySockets = io.sockets.adapter.rooms[countRoom].sockets;
            var socket;
            var i = 0;
            Protocol_1.PackageProtocol.resMatch.server_time = new Date().getTime();
            Protocol_1.PackageProtocol.resMatch.users = [];
            for (var keySocket in keySockets) {
                socket = io.sockets.sockets[keySocket];
                socket.clientObject._room = room;
                Protocol_1.PackageProtocol.resMatch.users[i] =
                    {
                        nickname: socket.clientObject._nickname,
                        index_pos: i,
                    };
                i++;
            }
            io.sockets.in(countRoom).emit('ResMatch', Protocol_1.PackageProtocol.resMatch);
            countRoom++;
            /*
            var roomId = socketClient.clientObject._room._roomId;
            
            socketClient.clientObject._room.startSchedule0(
                function () {
                    if (io.sockets.adapter.rooms[roomId] === undefined) {
                        console.log("room sch error");
                        return;
                    }

                    PackageProtocol.resStateEnemy.states = [];
                    var keySockets = io.sockets.adapter.rooms[roomId].sockets;
                    var socket;
                    i = 0;
                    for (var keySocket in keySockets) {
                        socket = io.sockets.sockets[keySocket];
                        if (
                            socket.clientObject.isPosChange()
                        ) {
                            socket.clientObject._req.nickname = socket.clientObject._nickname;
                            PackageProtocol.resStateEnemy.states[i] = socket.clientObject._req;
                            i++;
                        }
                    }

                    if(i > 0) io.sockets.in(roomId).emit('ResStateEnemy', PackageProtocol.resStateEnemy);
                },
                1000

            );
            */
        }
        else {
            Protocol_1.PackageProtocol.resMatchWait.count_user = io.sockets.adapter.rooms[countRoom].length;
            io.sockets.in(countRoom).emit('ResMatchWait', Protocol_1.PackageProtocol.resMatchWait);
        }
    });
    socketClient.on("ReqStatePlayer", (req) => {
        //console.log(req);
        socketClient.clientObject.setPos(req);
        Protocol_1.PackageProtocol.resStateEnemy.nickname = socketClient.clientObject._nickname;
        Protocol_1.PackageProtocol.resStateEnemy.state = socketClient.clientObject._req.state;
        Protocol_1.PackageProtocol.resStateEnemy.direction = socketClient.clientObject._req.direction;
        Protocol_1.PackageProtocol.resStateEnemy.speed = socketClient.clientObject._req.speed;
        Protocol_1.PackageProtocol.resStateEnemy.px = socketClient.clientObject._req.px;
        Protocol_1.PackageProtocol.resStateEnemy.py = socketClient.clientObject._req.py;
        Protocol_1.PackageProtocol.resStateEnemy.pz = socketClient.clientObject._req.pz;
        // PackageProtocol.resStateEnemy.time = new Date().getTime();
        socketClient.in(socketClient.clientObject._room._roomId).emit('ResStateEnemy', Protocol_1.PackageProtocol.resStateEnemy); //���� �뿡 �ִ� �ش�Ŭ�󻩰� ������
    });
    socketClient.on("message", (req) => {
        // console.log(req);
        // io.emit("message", req);
        Protocol_1.PackageProtocol.resMessage.username = req.username;
        Protocol_1.PackageProtocol.resMessage.content = req.content;
        io.emit("message", Protocol_1.PackageProtocol.resMessage);
    });
});
//# sourceMappingURL=app.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socketIO = require("socket.io");
const Protocol_1 = require("./Protocol");
const Client_1 = require("./Client");
const Room_1 = require("./Room");
const ConnectRedis_1 = require("./ConnectRedis");
//npm install --save-dev typescript ts-node
//npm install --save typescript socket.io
//node_modules\.bin\ts-node app.ts
//node_modules/.bin/tsc app.ts
//npm i node-schedule --save
//npm install --save @types/node-schedule
//npm install --save @types/redis
//npm install redis --save
ConnectRedis_1.ConnectRedis.getInstance().set("key0", "value0");
console.log(ConnectRedis_1.ConnectRedis.getInstance().get(function (reply) {
    console.log(reply);
}, "key0"));
let io = socketIO.listen(3000);
var countRoom = 0;
io.on("connection", (socketClient) => {
    console.log("connection");
    socketClient.on("disconnect", () => {
        console.log("disconnect");
        if (socketClient.clientObject._room !== undefined) {
            socketClient.leave(socketClient.clientObject._room._roomId);
            if (io.sockets.adapter.rooms[socketClient.clientObject._room._roomId] !== undefined &&
                io.sockets.adapter.rooms[socketClient.clientObject._room._roomId].length === 0) {
                socketClient.clientObject._room.destroy();
                delete socketClient.clientObject._room;
            }
        }
        socketClient.clientObject.destroy();
        delete socketClient.clientObject;
    });
    socketClient.clientObject = new Client_1.PackageClient.Client();
    socketClient.on("ReqMatch", (req) => {
        console.log(req);
        socketClient.join(countRoom);
        if (io.sockets.adapter.rooms[countRoom].length == 2) {
            var room = new Room_1.PackageRoom.Room(countRoom);
            var keySockets = io.sockets.adapter.rooms[countRoom].sockets;
            var socket;
            for (var keySocket in keySockets) {
                socket = io.sockets.sockets[keySocket];
                socket.clientObject._room = room;
            }
            io.sockets.in(countRoom).emit('ResMatch', Protocol_1.PackageProtocol.resMatch);
            countRoom++;
            var roomId = socketClient.clientObject._room._roomId;
            socketClient.clientObject._room.startSchedule0(function () {
                Protocol_1.PackageProtocol.resMessage.username = "test";
                Protocol_1.PackageProtocol.resMessage.content = "test";
                io.sockets.in(roomId).emit('message', Protocol_1.PackageProtocol.resMessage);
            }, 500);
        }
        else {
            Protocol_1.PackageProtocol.resMatchWait.count_user = io.sockets.adapter.rooms[countRoom].length;
            io.sockets.in(countRoom).emit('ResMatchWait', Protocol_1.PackageProtocol.resMatchWait);
        }
    });
    socketClient.on("message", (req) => {
        console.log(req);
        // io.emit("message", req);
        Protocol_1.PackageProtocol.resMessage.username = req.username;
        Protocol_1.PackageProtocol.resMessage.content = req.content;
        io.emit("message", Protocol_1.PackageProtocol.resMessage);
    });
});
//# sourceMappingURL=app.js.map
import * as socketIO from "socket.io";

import { PackageProtocol } from "./Protocol";
import { PackageClient } from "./Client"; 
import { PackageRoom } from "./Room";
import { ConnectRedis } from "./ConnectRedis"; 
import { Socket } from "dgram";

//npm install --save-dev typescript ts-node
//npm install --save typescript socket.io
//node_modules\.bin\ts-node app.ts
//node_modules/.bin/tsc app.ts

//npm i node-schedule --save
//npm install --save @types/node-schedule

//npm install --save @types/redis
//npm install redis --save

ConnectRedis.getInstance().set("key0", "value0");
console.log(ConnectRedis.getInstance().get(
    function (reply) {
        console.log(reply);
    },
    "key0"
));

let io: any = socketIO.listen(3000);
var countRoom = 0;
io.on("connection", (socketClient: any) => {
    console.log("connection");
    socketClient.on("disconnect", () => {
        console.log("disconnect");

        if (socketClient.clientObject._room !== undefined) {
            socketClient.leave(socketClient.clientObject._room._roomId);
            if (
                io.sockets.adapter.rooms[socketClient.clientObject._room._roomId] !== undefined &&
                io.sockets.adapter.rooms[socketClient.clientObject._room._roomId].length === 0
            )
            {
                socketClient.clientObject._room.destroy();
                delete socketClient.clientObject._room;
            }
        }
        

        socketClient.clientObject.destroy();
        delete socketClient.clientObject;
    });



    socketClient.clientObject = new PackageClient.Client();

    socketClient.on("ReqMatch", (req: PackageProtocol.ReqMatch) => {
        console.log(req);
        socketClient.join(countRoom);
        if (io.sockets.adapter.rooms[countRoom].length == 2) {
            var room = new PackageRoom.Room(countRoom);

            var keySockets = io.sockets.adapter.rooms[countRoom].sockets;
            var socket;
            for (var keySocket in keySockets) {
                socket = io.sockets.sockets[keySocket];
                socket.clientObject._room = room;
            }
            io.sockets.in(countRoom).emit('ResMatch', PackageProtocol.resMatch);
            countRoom++;
            var roomId = socketClient.clientObject._room._roomId;
            socketClient.clientObject._room.startSchedule0(
                function () {
                    PackageProtocol.resMessage.username = "test";
                    PackageProtocol.resMessage.content = "test";
                    io.sockets.in(roomId).emit('message', PackageProtocol.resMessage);
                },
                500
            );
        } else {
            PackageProtocol.resMatchWait.count_user = io.sockets.adapter.rooms[countRoom].length;
            io.sockets.in(countRoom).emit('ResMatchWait', PackageProtocol.resMatchWait);
        }

        
    });

    socketClient.on("message", (req: PackageProtocol.ReqMessage) => {
        console.log(req);
       // io.emit("message", req);

        PackageProtocol.resMessage.username = req.username;
        PackageProtocol.resMessage.content = req.content;
        io.emit("message", PackageProtocol.resMessage);
    });

    
});
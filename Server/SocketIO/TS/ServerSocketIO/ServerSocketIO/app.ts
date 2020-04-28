import * as socketIO from "socket.io";

import { PackageProtocol } from "./Protocol";
import { PackageClient } from "./Client"; 

//npm install --save-dev typescript ts-node
//npm install --save typescript socket.io
//node_modules\.bin\ts-node app.ts
//node_modules/.bin/tsc app.ts

let io: any = socketIO.listen(3000);

PackageClient.Client.count = 0;

io.on("connection", (socketClient: any) => {
    console.log("connection");
    socketClient.on("disconnect", () => {
        console.log("disconnect");

        delete socketClient.clientObject;
    });

    socketClient.clientObject = new PackageClient.Client(10);

    socketClient.on("message", (message: PackageProtocol.Message) => {
        console.log(message);
        console.log(socketClient.clientObject.getArea());
        console.log(socketClient.clientObject.radius);
        io.emit("message", message);
    });

    
});
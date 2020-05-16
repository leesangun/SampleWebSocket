var io = require('./socket.io');

/*
let self = this;
        if (cc.sys.isNative) {
            window.io = SocketIO.connect;
        } else {
            require('socket.io');
        }
        var socket = io('http://localhost:3000');
        socket.on('connected', function (msg) {
            self.label.string = msg;
        });
*/ 

var instance;
var _sceneCurrent;

//var ClientSocketIO.NET_ROOMJOIN_ACK = 'roomJoinAck';

var ClientSocketIO = function (uri) {
    this.uri = uri;

    this.reqPlayItemUseF = {
        itemType: null,
    };
};

ClientSocketIO.getInstance = function (sceneCurrent,sessionKey) {
    _sceneCurrent = sceneCurrent;
    if (instance === undefined) {
        instance = new ClientSocketIO('http://127.0.0.1:3000?session_key='+sessionKey);
        instance.connect();
    }
    instance.reConnect();
    return instance;
};

ClientSocketIO.prototype = {
    connect: function () {
        this._socket = io.connect(this.uri);

        if (this._socket === undefined) {
            // cc.log("Could not connect to socket.io");
        }  else {
            var self = this;

            console.log('connect');
            this._socket.on('recv', function (data) {
                //alert('nick ' + data);
                //  cc.log(data);

                //var jData = JSON.parse(data);
               // alert(data.rankData[0].nick);

                //socket.emit('join', {username: 'Android Application'})
            });

            this._socket.on("ResMatch", function (data) {
                _sceneCurrent.ack("ResMatch", data);
            });

            this._socket.on("ResMatchWait", function (data) {
                _sceneCurrent.ack("ResMatchWait", data);
            });

            this._socket.on("ResStateEnemy", function (data) {
                _sceneCurrent.ack("ResStateEnemy", data);
            });

            this._socket.on("ResDisconnectOpp", function (data) {
                _sceneCurrent.ack("ResDisconnectOpp", data);
            });
            

            this._socket.on("ResError", function (data) {
                _sceneCurrent.ack("ResError", data);
            });


            /*
            var roomJoinReq = {
                roomNo: 0,
            };

            this._socket.emit(this.REQ_ROOM_JOIN, roomJoinReq);
            */

        }
    },

    reConnect: function () {
        if(!this._socket.connected){
            this._socket.connect();
        }
    },

    disconnect: function () {
        this._socket.disconnect();
    },

    reqMatch: function (nickname){
        this._socket.emit("ReqMatch", 
            {
                nickname: nickname
            }
        );
    },

    reqStatePlayer: function (state,px,py,pz){
        this._socket.emit("ReqStatePlayer", 
            {
                state:state,
                px: px,
                py: py,
                pz: pz,
            }
        );
    },
};

module.exports = ClientSocketIO;
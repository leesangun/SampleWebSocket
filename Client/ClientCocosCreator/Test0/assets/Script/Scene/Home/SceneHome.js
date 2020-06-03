// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
var ClientSocketIO = require('ClientSocketIO');
var ScenePlay = require("ScenePlay");
cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        _clientSocketIO:ClientSocketIO,
        labelUserCount:cc.Label,

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        var $_GET = this.getGetData();
        ClientSocketIO.nickname = $_GET["nickname"];

        this.clientSocketIO = ClientSocketIO.getInstance(this,"AppController.sessionKey");
        this.clientSocketIO.reqMatch(ClientSocketIO.nickname);

    },

    // update (dt) {},

    ack (key,data) {
        console.log(key + " " + data);
        switch(key){
            case "ResMatchWait":{
                //console.log(data.count_user);
                this.labelUserCount.string = data.count_user + "/3";
                break;
            }
            case "ResMatch":{
                ClientSocketIO.resMatch = data;
                this.clientSocketIO.setServerTime(data.server_time);
                 cc.director.loadScene("Play");
                break;
            }
        }
    },

    getGetData(){
        var $_GET = {};
        var args = location.search.substr(1).split(/&/);
        for (var i = 0; i < args.length; ++i) {
            var tmp = args[i].split(/=/);
            if (tmp[0] !== '') $_GET[decodeURIComponent(tmp[0])] = decodeURIComponent(tmp.slice(1).join("").replace("+", " "));
        }
        return $_GET;
    },
});

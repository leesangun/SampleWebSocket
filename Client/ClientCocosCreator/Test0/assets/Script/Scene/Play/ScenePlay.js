// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

var Player = require("./Player");
var Enemy = require("./Enemy");
var ClientSocketIO = require('ClientSocketIO');

/*
ClientSocketIO.nickname
ClientSocketIO.resMatch   ResMatch  받은값
*/

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

        root3d:cc.Node,

        labelTime:cc.Label,

        player:Player,
        _enemys:{
            default: [], 
            type: Enemy, 
        },
        prefabEnemy:cc.Prefab,
        posStarts:{
            default: [], 
            type: cc.Node, 
        },

        buttonL:cc.Button,
        buttonR:cc.Button,
        buttonF:cc.Button,
        buttonB:cc.Button,

        _clientSocketIO:ClientSocketIO,
 
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () {
        // cc.director.getPhysics3DManager().enabled = true;
        // var nodeEnemy = cc.instantiate(this.prefabEnemy);
        // this.root3d.addChild(nodeEnemy);
        // var pos = this.posEnemy0.position;
        // nodeEnemy.position = pos;
        // return;


        this._clientSocketIO = ClientSocketIO.getInstance(this,"AppController.sessionKey");
        

        cc.director.getPhysics3DManager().enabled = true;
        // var physicsManager = cc.director.getPhysicsManager();
        // physicsManager.enabled = true;
        // physicsManager.gravity = cc.v2(0, -200);

        // var manager = cc.director.getCollisionManager(); 
        // manager.enabled = true;

        var self = this;
        this.buttonL.node.on(cc.Node.EventType.TOUCH_START, function(event){
            self.player._moveDirect = 1;
            self.reqStateStart();
        });
        this.buttonL.node.on(cc.Node.EventType.TOUCH_END, function(event){
            self.reqStateStop();
        });

        this.buttonR.node.on(cc.Node.EventType.TOUCH_START, function(event){
            self.player._moveDirect = 2;
            self.reqStateStart();
        });
        this.buttonR.node.on(cc.Node.EventType.TOUCH_END, function(event){
            self.reqStateStop();
        });

        this.buttonF.node.on(cc.Node.EventType.TOUCH_START, function(event){
            self.player._moveDirect = 3;
            self.reqStateStart();
        });
        this.buttonF.node.on(cc.Node.EventType.TOUCH_END, function(event){
            self.reqStateStop();
        });

        this.buttonB.node.on(cc.Node.EventType.TOUCH_START, function(event){
            self.player._moveDirect = 4;
            self.reqStateStart();
        });
        this.buttonB.node.on(cc.Node.EventType.TOUCH_END, function(event){
            self.reqStateStop();
        });
        cc.find("Canvas").on(cc.Node.EventType.TOUCH_END, function(event){
            if(self.player._moveDirect !== 0){
                self.reqStateStop();
            }
        });

        var callback = function () {
            if(self.player._moveDirect !== 0){
                self.reqStartPlayer(1);
            }
            self.labelTime.string = self._clientSocketIO.getServerTime();
        }
        this.schedule(callback, 1);

        ClientSocketIO.resMatch.users.forEach(function(element){
            console.log(element.nickname);
            if(ClientSocketIO.nickname !== element.nickname){
                var nodeEnemy = cc.instantiate(self.prefabEnemy);
                self.root3d.addChild(nodeEnemy);
                var pos = self.posStarts[element.index_pos].position;
                nodeEnemy.position = pos;
                var enemy = nodeEnemy.getComponent(Enemy);
                enemy.setNickname(element.nickname);
                self._enemys.push(enemy);
            }else{
                self.player.node.position = self.posStarts[element.index_pos].position;
            }
            
        });

        this.player.setNickname(ClientSocketIO.nickname);
    
     },

     reqStateStart(){
         console.log("start");
        this.reqStartPlayer(0);
     },

    reqStateStop(){
        this.player._moveDirect = 0;
        this.reqStartPlayer(2);
    },

    reqStartPlayer(state){
        var pPosition = this.player.node.position;
        this._clientSocketIO.reqStatePlayer(state,this.player._moveDirect,this.player._speed,pPosition.x.toFixed(2) , pPosition.y.toFixed(2), pPosition.z.toFixed(2));
    },

    start () {

    },

    // update (dt) {},

    ack (key,data) {
        //console.log(key + " " + data);
        
        switch(key){
            case "ResStateEnemy":{
                /*
                var self = this;
                
                data.states.forEach(function(element){
                    self._enemys.forEach(function(enemy){console.log(key + " " + element.nickname);
                        if(element.nickname === enemy._nickname){
                           // enemy.node.position = cc.v3(element.x,element.y,element.z);
                          // console.log(element);
                            enemy.setPos(element.state,element.direction,element.speed, cc.v3(element.px,element.py,element.pz));
                        }
                            
                    });
                });
                */
               this._enemys.forEach(function(enemy){
                    if(data.nickname === enemy._nickname){
                        enemy.setPos(data.state,data.direction,data.speed, cc.v3(data.px,data.py,data.pz));//,data.time);
                    }
                        
                });
                break;
            }
            case "ResDisconnectOpp":{
                var idx = this._enemys.findIndex(function(item) {return item._nickname === data.nickname}); 
               console.log("ResDisconnectOpp " + idx);
                //this.root3d.removeChild(this._enemys[idx].node);
                this._enemys[idx].node.destroy();
                if (idx > -1) this._enemys.splice(idx, 1)

                
                break;
            }

            
        }
    },
});
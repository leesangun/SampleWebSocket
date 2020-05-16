// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
var BasePlayer = require("./BasePlayer");
cc.Class({
    extends: BasePlayer,

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

        _moveDirect:0,      //0 stop  1 left  2 right  3 front  4 back
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    update (dt) {
        switch(this._moveDirect){
            case 1:{
               // console.log(this.node.position.x);
                //this.node.position.x -= dt;
                this.node.position = cc.v3(this.node.position.x-dt,this.node.position.y,this.node.position.z);
                break;
            }
            case 2:{
                 this.node.position = cc.v3(this.node.position.x+dt,this.node.position.y,this.node.position.z);
                 break;
             }
             case 3:{
                this.node.position = cc.v3(this.node.position.x,this.node.position.y,this.node.position.z-dt);
                break;
            }
            case 4:{
                this.node.position = cc.v3(this.node.position.x,this.node.position.y,this.node.position.z+dt);
                break;
            }
        }

    },


});

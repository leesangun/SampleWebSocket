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

        _posPrev:cc.v3,
        _pos:cc.v3,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this._pos = null;
        this._posPrev = null;
    },

    update (dt) {
        if(this._posPrev === null)return;

       // this.node.position = this.node.position + ((this._pos - this._posPrev) * dt); 
       this.node.position = cc.v3(
            this.node.position.x + ((this._pos.x - this._posPrev.x) * dt),
            this.node.position.y + ((this._pos.y - this._posPrev.y) * dt),
            this.node.position.z + ((this._pos.z - this._posPrev.z) * dt)
        ); 
    },

    //현재 위치 = 이전 위치 + ( 속도 * 시간 ) + ( 1 / 2 * 가속도 * 시간 ^ 2 )
    setPos(state,pos){
        this.node.position = pos;
        
        switch(state){
            case 0:{
                this._posPrev = this._pos;
                break;
            }
            case 1:{
                this._posPrev = null;
                break;
            }
        }
        
        this._pos = pos;

        // if(this._posPrev !== null){
        //     console.log(this._posPrev);console.log(this._pos);
        //     console.log(cc.v3(this._pos.x - this._posPrev.x,this._pos.y - this._posPrev.y,this._pos.z - this._posPrev.z));
        // }
    },

});

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

        // _posPrev:cc.v3,
        // _pos:cc.v3,
        _direction:-1,
        _state:2,
    },


    update (dt) {
        

       // this.node.position = this.node.position + ((this._pos - this._posPrev) * dt); 
        if(this._state === 0 || this._state === 1){
            switch(this._direction){
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
        }
        
        // else if(this._state === 1){
        //     if(this._posPrev === null)return;
        //     this.node.position = cc.v3(
        //         this.node.position.x + ((this._pos.x - this._posPrev.x) * dt),
        //         this.node.position.y + ((this._pos.y - this._posPrev.y) * dt),
        //         this.node.position.z + ((this._pos.z - this._posPrev.z) * dt)
        //     ); 
        // }



    },

    //현재 위치 = 이전 위치 + ( 속도 * 시간 ) + ( 1 / 2 * 가속도 * 시간 ^ 2 )
    setPos(state,direction,pos){
        this.node.position = pos;
      //  console.log(state + " " + pos.x);
        this._state = state;
        this._direction = direction;
        // switch(state){
        //     case 1:{
        //         this._posPrev = this._pos;
        //         break;
        //     }
        //     case 2:{
        //         this._posPrev = null;
        //         break;
        //     }
        // }
        
        //this._pos = pos;

    },

});

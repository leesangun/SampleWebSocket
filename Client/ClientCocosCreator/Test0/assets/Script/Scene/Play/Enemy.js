// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

var BasePlayer = require("./BasePlayer");
//var ScenePlay = require('ScenePlay');
cc.Class({
    extends: BasePlayer,

    properties: {

       //  _posPrev:cc.v3,
        _direction:-1,
        _state:2,
        _speed:0,

       // _scene:ScenePlay,
    },

    start(){
       // this._scene=cc.find("Scene").getComponent("ScenePlay");
     // this._posPrev = this.node.position;
    },

    update (dt) {
        

       // this.node.position = this.node.position + ((this._pos - this._posPrev) * dt); 
        if(this._state === 0 || this._state === 1){
            switch(this._direction){
                case 1:{
                    this.node.x = this.node.position.x-(dt*this._speed);
                    break;
                }
                case 2:{
                    this.node.x = this.node.position.x+(dt*this._speed);
                     break;
                 }
                 case 3:{
                    this.node.z = this.node.position.z-(dt*this._speed);
                    break;
                }
                case 4:{
                    this.node.z = this.node.position.z+(dt*this._speed);
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
    setPos(state,direction,speed,pos){//,time){
        
        this.node.position = pos;
        /*
        var gapTime = (this._scene._clientSocketIO.getServerTime()-time)*0.001;
        switch(direction){
            case 1:{
                this.node.position = cc.v3(this.node.position.x-(gapTime*this._speed),this.node.position.y,this.node.position.z);
                break;
            }
            case 2:{
                 this.node.position = cc.v3(this.node.position.x+(gapTime*this._speed),this.node.position.y,this.node.position.z);
                 break;
             }
             case 3:{
                this.node.position = cc.v3(this.node.position.x,this.node.position.y,this.node.position.z-(gapTime*this._speed));
                break;
            }
            case 4:{
                this.node.position = cc.v3(this.node.position.x,this.node.position.y,this.node.position.z+(gapTime*this._speed));
                break;
            }
        }
        this._posPrev = this.node.position;
        */

      //  console.log(state + " " + pos.x);
        this._state = state;
        this._direction = direction;
        this._speed = speed;
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

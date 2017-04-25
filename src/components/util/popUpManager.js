import Vue from 'vue'
let hasModal = false;

let instances ={};
const popManager={
    zIndex:2000,
    nextZIndex(){
      return this.zIndex++;  
    },
    getInstance(id){
        return instances[id];
    },
    //绑定popUpId 和组件
    register(popUpId,component){

    }

}

export default popManager;
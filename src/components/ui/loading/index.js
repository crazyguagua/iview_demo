import loadingBar from './loadingBar'
//sb了 把 import Vue from 'vue' 写成了 import Vue from 'Vue' 坑了一下午。。。
import Vue from 'vue'
export default{
    timer:null,
    instance:null,
    div:null,
    start(){
        if(!this.instance){
            this.create()
        }
        if(this.timer)return;
        let self = this;
        this.timer = setInterval(function(){
            self.instance.update();
        },200)
    },
    create(){
        if(this.instance){
           return; 
        }
        this.div = document.createElement('div');
        this.div.innerHTML='<loading-bar></loading-bar>'
        document.body.appendChild(this.div);
        this.instance = new Vue({
            el:this.div,
            data:{},
            components:{
                loadingBar
            },
        }).$children[0];
        Vue.prototype.$loadingBar = this.instance;
    },
    finish(){

    },
    update(){

    },
    error(){

    }
}
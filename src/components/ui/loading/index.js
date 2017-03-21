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
        let percentage =0;
        this.timer = setInterval(function(){
             percentage += Math.random()*3 ;
            if(percentage>90){
                clearInterval(self.timer);
            }else{
                self.instance.updateStatus({
                    percentage:percentage,
                    status:'success',
                    show:true
                });
            }
            

        },200)
    },
    create(){
        if(this.instance){
           return; 
        }
        this.div = document.createElement('div');
        //根据默认config prop传入loading-bar组件
        let props ='';
        Object.keys(this.config).forEach(prop=>{
            //TODO 最好是驼峰转横杠分割
            let val =this.config[prop];
            props+=`${prop}=${val} `
        })
        this.div.innerHTML=`<loading-bar ${props}></loading-bar>`
        document.body.appendChild(this.div);
        this.instance = new Vue({
            el:this.div,
            data:{},
            components:{
                loadingBar
            },
        }).$children[0];//这里 $children[0]取到的才是loadingBar的实例
        Vue.prototype.$loadingBar = this.instance;
    },
    finish(){
        clearInterval(this.timer);
        this.instance.updateStatus({
            percentage:100,
            show:true,
            status:'success'
        })
        this.hide();
    },
    //传入百分比，实际的数值，不是默认的模拟
    update(percentage){
         clearInterval(this.timer);
         this.instance.updateStatus({
            percentage:percentage,
            show:true,
            status:'success'
        })
    },
    error(){
         clearInterval(this.timer);
         this.instance.updateStatus({
            percentage:100,
            show:true,
            status:'error'
        });
        this.hide();
    },
    hide(){
        let self = this;
        setTimeout(()=>{
            self.instance.updateStatus({
                show:false
            });
            setTimeout(()=>{
                self.instance.updateStatus({
                    percentage:0
                })
            })
        },800)
    },
    destroy(){
         clearInterval(this.timer);
         
         document.body.removeChild(this.div);//这行报错
         this.instance = null;
    },
    globalConfig(config){
        if(config.color){this.config.color = config.color}
        if(config.failedColor){this.config.failedColor = config.color}
        if(config.height){this.config.height = config.height}
    },
    config:{
        color:'primary',
        height:2,
        failedColor:'error'
    }
    
}
<template>
        <div :class="classes" :style="styles">
            <notification v-for="notice in notices" :iconCls="notice.iconCls" 
                :message="notice.message" :prefix="prefix" :name="notice.name" 
                :duration="notice.duration" :content="notice.content">
            
            </notification>
    
        </div>
    
</template>
<script>
    import notification from './notification';
    const prefix='my-notice';
    export default{
        components:{
            notification
        },
        props:{
            prefix: {
                type: String,
                default: prefix
            },
            styles:{
                type:Object,
                default:function(){
                    //默认值如果是Object或者是数组需要通过一个函数来返回一个对象或数组 作为默认值
                  return{
                      top:'60px',
                      left:'50%'
                  }  
                }
            }
           
        },
        computed:{
            classes(){
                return [`${this.prefix}`]
            }
        },
        data(){
            return {
                notices:[],
                id:0
            }
        },
        methods:{
            genId(){
                this.id++;
                return `my-notice-${this.id}`;
            },
            addNotice(notice){
                let source={
                    styles:this.styles,
                    id:this.genId()
                }
                //Object.assign（target,source） 从 source 复制属性到target
                let _notice = Object.assign(notice,source)
                this.notices.push(_notice);
            },
            close(name){
                for(let i=0;i<this.notices.length;i++){
                    if(this.notices[i].name === name){
                        this.notices.splice(i,1);
                        break;
                    }
                }
            }
        }
        
    }
</script>
<style lang="less">
    .my-notice,.my-message{
           font-size: 12px;
            position: fixed;
            z-index: 1010;
            width: 100%;
            top: 16px;
            left: 0;
    }
</style>

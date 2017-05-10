<template>
        <transition :name="transName">
            <div :class="classes">
                <div :class="contentCls" v-html="content">
                   
                </div>
            </div>
        </transition>
    
</template>
<script>

    export default{
        props:{
            message:String,
            // iconCls:String,
            prefix:{
                type:String,
                required:true
            },
             transName:{
                type:String,
                default:'fade'
            },
            //消息持续时间
            duration:{
                type:Number,
                default:1
            },
            name:{
                //notice的唯一标示
                type:String
            },
            content:{ //notification组件中可以定制的html内容
                type:String
            }
        },
        computed:{
            classes(){
                return [`${this.prefix}-notice`]
            },
            contentCls(){
                return [`${this.prefix}-notice-content`]
            }
        },
        data(){
            return{
                closeTimer:null
            }
        },
        //挂载时加上定时器让notification自动消失
        mounted(){
            if(this.duration!=0){
                this.closeTimer = setTimeout(()=>{
                    this.close();
                },this.duration*1000)
            }
            
        },
        methods:{
            closeTimer(){
                if(this.closeTimer!=null){
                    clearTimeout(this.closeTimer);
                }
            },
            close(){
                //通过父组件container 查找name 从数组中删除
                this.$parent.close(this.name);
            }
        },
        beforeClose(){
            debugger;
            this.closeTimer();
        }
    }
</script>
<style lang="less">
    .my-message-notice{
        width: auto;
        vertical-align: middle;
        position: absolute;
        left: 50%;
        &-content{
                position: relative;
                right: 50%;
                padding: 8px 16px;
                border-radius: 4px;
                box-shadow: 0 1px 6px rgba(0,0,0,.2);
                background: #fff;
                display: block;
                .iconfont{
                        margin-right: 8px;
                        font-size: 16px;
                        position: relative;
                        top:2px;
                }
                i.success{
                    color:#20d420;
                }
                 i.info{
                    color:#20cdf7;
                }
                 i.error{
                    color:#f90808;
                }
                 i.warning{
                    color:#e4e41d;
                }
        }
    }
</style>
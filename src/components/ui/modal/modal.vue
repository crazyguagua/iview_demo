<template>
    <div :class="prefix">
        <div :class="[`${prefix}-wrap`,customCls]" v-show="visible==true">
            <div :class="[`${prefix}-content`,modalSize]" :style="styles">
                <div :class="`${prefix}-header`">
                    <span class="title">
                        {{title}}
                    </span>
                    <div class="closeBtn" v-show="closeBtn">
                        <i class="iconfont icon-close" @click="handleCloseBtn"></i>
                    </div>
                </div>
                <div :class="`${prefix}-body`">
                    <slot></slot>
                </div>
                <div :class="`${prefix}-footer`">
                    <slot name="footer"></slot>
                </div>
            </div>
        </div>
        <transition name="fade">
             <div class="mask" v-show="visible==true"></div>
        </transition>
    
    </div>
    

</template>

<script>
    const prefix='myModal'
    export default{
        name:'myModal',
        props:{
            value:{
                type:Boolean,
                default:false
            },
            title:String,
            closeBtn:{
                type:Boolean,
                default:true
            },
            size:{
                type:String,
                default:'small'
            },
            top:{
                type:String,
                default:'15%'
            },
            customCls:String
        },
        data(){
            return {
                visible:this.value,
                prefix:prefix,
                modalSize:`modal-${this.size}`,
                styles:{
                    top:this.top
                }
            }
        },
        methods:{

            handleCloseBtn(){
                this.visible = false;
                //向上传递input事件，和v-model双向绑定，
                this.$emit('input',false);
            }
        },
        watch:{
            value(val){
                this.visible = val
            }
        }
    }
</script>
<style lang="less">
    .myModal{
        & .mask{
            position:fixed;
            left:0;
            right:0;
            top:0;
            bottom:0;
            background:rgba(55,55,55,.7);
            z-index:1000;
        }
        & .myModal-wrap{
            position:fixed;
            left:0;
            right:0;
            top:0;
            bottom:0;
            z-index:1001;
        }
        & .fade-enter,& .fade-leave-active{
            opacity:0;
        }
        & .fade-enter-active, & .fade-leave-active{
            transition:opacity .5s;
        }
        &-header{
            padding:20px;
            border-bottom: 1px solid #e3e8ee;
            line-height:1;
            & .title{
                 font-size: 16px;
                font-weight: 700;
                color: #1f2d3d;
            }
            & .closeBtn{
                cursor:pointer;
            }
        }
        &-footer{
                border-top: 1px solid #e3e8ee;
                padding: 12px 18px;
                text-align: right;
        }
        &-body{
                padding:30px 20px;
                color: #48576a;
                font-size: 14px;
        }
        & .closeBtn{
            float:right;
        }
        & .modal-small{
            width:50%;
        }
        &-content{
            position:absolute;
            left:50%;
            background:#fff;
            box-sizing:border-box;
            transform:translateX(-50%);
            box-shadow:0 1px 3px rgba(0,0,0,.6);
        }
    }

</style>
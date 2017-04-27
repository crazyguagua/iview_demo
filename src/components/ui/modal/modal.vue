<template>
 
    <!--modal begin --><div :class="prefix">
        <transition name="dialog-fade">
            <div :class="[`${prefix}-wrap`,customCls]" v-show="visible==true">
                <div :class="[`${prefix}-content`,modalSize]" :style="styles" >
                    <div :class="`${prefix}-header`">
                        <span class="title">
                            {{title}}
                        </span>
                        <div class="closeBtn" v-show="closeBtn">
                            <i class="iconfont icon-close" @click="close"></i>
                        </div>
                    </div>
                    <div :class="`${prefix}-body`">
                        <slot name="body"></slot>
                    </div>
                    <div :class="`${prefix}-footer`">
                        <slot name="footer"></slot>
                    </div>
                </div>
            </div>
        </transition>
           <!-- <transition name="dialog-fade">
                <div class="mask" v-show="visible==true"></div>
            </transition> --> 
    
    </div><!--modal end -->
  

</template>

<script>
    const prefix='myModal'
    import PopUp from '../../util/modalPopUp';
    export default{
        name:'myModal',
        mixins:[PopUp],
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
            customCls:String,
             appendToBody:{ //弹框是否 append到body中
                type:Boolean,
                default:true
            },
            modal:{ //是否为模态框 是否需要遮罩
                type:Boolean,
                default:true
            }
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

            // handleCloseBtn(){
            //     this.visible = false;
            //     //向上传递input事件，和v-model双向绑定，
            //     this.$emit('input',false);
            // }
        },
        watch:{
            value(val){
                this.visible = val;
            },
            visible(val){
                this.$emit('input',val);
                if(val){
                    //向上发布open事件
                    this.$emit('open')
                }else{
                    this.$emit('close')
                }
            }
        },
       
        mounted(){
            console.log('mounted');
            if(this.value){
                this.open();
            }
        }

    }
</script>
<style lang="less">
    .myModal{
        // & .mask{
        //     position:fixed;
        //     left:0;
        //     right:0;
        //     top:0;
        //     bottom:0;
        //     background:rgba(55,55,55,.7);
        //     z-index:1000;
        // }
        & .myModal-wrap{
            position:fixed;
            left:0;
            right:0;
            top:0;
            bottom:0;
            // background:rgba(55,55,55,.7);
            // z-index:1001;
            overflow: auto;
        }
        // & .dialog-fade-enter,& .dialog-fade-leave-active{
        //     opacity:0;
        //     transform: translate3d(0, 0, 0);
        // }
        & .dialog-fade-enter-active {
            animation: dialog-fade-in .3s;
        }
        & .dialog-fade-leave-active{
            animation: dialog-fade-out .3s;
        }
        @keyframes dialog-fade-in{
            0%{
                opacity:0;
                transform: translate3d(0, -20px, 0);
            }
            100%{
                opacity:1;
                transform:translate3d(0,0,0);
            }
        }
        @keyframes dialog-fade-out{
            0%{
                opacity:1;
                transform: translate3d(0, 0, 0);
            }
            100%{
                opacity:0;
                transform:translate3d(0,-20px,0);
            }
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
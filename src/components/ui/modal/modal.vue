<template>
 
    <!--modal begin --><div :class="prefix">
        <transition name="dialog-fade">
            <div :class="[`${prefix}-wrap`,customCls]" v-show="visible==true" @click="handleWrapperClose">
                <div :class="[`${prefix}-content`,modalSize]" :style="styles" >
                    <div :class="`${prefix}-header`">
                        <span class="title">
                            {{title}}
                        </span>
                        <div class="closeBtn" v-show="closeBtn">
                            <i class="iconfont icon-close" @click="handleModalClose"></i>
                        </div>
                    </div>
                    <div :class="`${prefix}-body`" v-if="rendered">
                        <slot name="body"></slot>
                    </div>
                    <div :class="`${prefix}-footer`" v-if="$slots.footer">
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
    import {oneOf} from '../../util/uiTool'
    export default{
        name:'myModal',
        mixins:[PopUp],
        props:{
            value:{
                type:Boolean,
                default:false
            },
            title:String,
            closeBtn:{//是否显示右上角的关闭按钮
                type:Boolean,
                default:true
            },
            size:{
                type:String,
                default:'small',
                validator(value){
                    return oneOf(value,['mini','small','large','full'])
                }
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
            },
            beforeClose:Function, //在modal关闭之前执行的函数，尤modal组件的调用者选择是否需要执行
            escEnable:{ //是否通过按下esc取消遮罩
                type:Boolean,
                default:true
            },
            clickWrapperClose:{
                //点击modal的wrapper 可以关闭modal
                type:Boolean,
                default:false
            },
            lockScroll:{
                //是否锁住body的滚动条
                type:Boolean,
                default:true
            }
        },
        data(){
            return {
                visible:this.value,
                prefix:prefix,
                modalSize:`modal-${this.size}`,
                //如果size==full的时候就不需要默认的top值了
                styles:this.size==='full'?{}:{top:this.top}
            }
        },
        methods:{

            // handleCloseBtn(){
            //     this.visible = false;
            //     //向上传递input事件，和v-model双向绑定，
            //     this.$emit('input',false);
            // }
            handleModalClose(){
                if(typeof this.beforeClose ==='function'){
                    this.beforeClose();
                }
                this.close();//调用modalPopUp的close 方法
            },
            handleWrapperClose(){
                if(this.clickWrapperClose){
                    this.close();
                }
            }
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
            // console.log('mounted 后执行');
            if(this.value){
                this.open();
            }
        },
        created(){
            // console.log('created  先执行');
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
        & .modal-mini{
            width:30%;
        }
        & .modal-large{
            width:90%;
        }
         & .modal-full{
            width:100%;
            height:100%;
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
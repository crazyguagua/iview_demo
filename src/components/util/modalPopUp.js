import PopupManager from './popUpManager'
import {merge,getDom,getScrollBarSize} from './uiTool'

export default{
    props:{
        modal:{
            type:Boolean,
            default:false
        },
        appendToBody:{ //弹框是否 append到body中
            type:Boolean,
            default:false
        },
        modalFade:{ //是否给遮罩添加淡入淡出的效果
            type:Boolean,
            default:true
        },
        modalCls:String, //弹出框遮罩的样式
        zIndex:{},//z-index 属性
        lockScroll:{
                //是否锁住body的滚动条
            type:Boolean,
            default:true
        }
    },
    watch:{
        value(val){
            if(val){
                if(!this.rendered){
                    this.rendered = true;
                    //此时dom没有更新
                    this.$nextTick(()=>{
                        //这时dom已经更新
                        this.open();
                    })
                }else{
                     this.open();
                }
               
            }else{
                this.close();
            }
        }
    },
    data(){
        return {
            opended:false,//弹出框是否已经打开
            seedId:1, //弹出框种子Id
            rendered:false//modal 的body是否渲染过（插入到父元素中）
        }
    },
    beforeMount(){
        // console.log('beforemount......');
        this.popupId = `popUp-${this.seedId}`;
        PopupManager.register(this.popupId,this);//注册到popUp管理器
        // console.log('beforemount');
    },
    destory(){
        console.log('destroy');
    },
    beforeDestroy(){
        // console.log('beforeDestroy');
        // debugger;
        PopupManager.deregister(this.popupId); //在popUpManager中注销
        PopupManager.closeModal(this.popupId);
    },
    methods:{
        open(options){
            
            //this.$props 这个取不到 ，只能取整个组件的属性
            const props = merge({}, (this.$props || this), options);
           this.doOpen(props);
        },
        close(){
            //由于监听value也会执行close方法，只需要执行一次doClose
           if( this.closing == true) return;
            this.doClose();
        },
        doClose(){
            this.closing = true;
            this.visible = false; //modal组件隐藏掉
            this.$emit('input',false); //触发v-model的双向绑定
            this.opened =false;
            PopupManager.closeModal(this.popupId);
            this.closing = false;
        },
        doOpen(props){
           if(this.opened ==true){
                return;
           }
            this.visible = true;
            this.$emit('input',true);
            //dom
            let dom = getDom(this.$el);
            const modal = props.modal;
            let zIndex = props.zIndex;
           
           //判断是否需要组织body的滚动条滚动
            if(props.lockScroll){
                //TODO  这种情况还没有测试过，讲道理应该在close，destroy的时候回复bodyOverflow bodyPaddingRight;
                if(!this.bodyOverflow){
                    this.bodyOverflow = document.body.style.overflow;
                    this.bodyPaddingRight = document.body.style.paddingRight;
                }
                let scrollbarW = getScrollBarSize();
                //判断body是否内容溢出
                let isBodyOverflow = document.documentElement.clientHeight<document.body.scrollTop;
                if(scrollbarW && isBodyOverflow){
                    document.body.style.paddingRight = scrollBarWidth + 'px';
                }
                document.body.style.overflow = 'hidden';
            }
            //modal
            if(modal){
               
                PopupManager.openModal(this.popupId,PopupManager.nextZIndex(),props.appendToBody==true?null:dom,props.modalCls,props.modalFade);
            }
            if(getComputedStyle(dom).position=='static'){
                dom.style.position = 'absolute';
            }
            if(!zIndex){
                zIndex = PopupManager.nextZIndex();
            }
            //保证modal组件的zIndex 高于遮罩的zIndex;
            dom.style.zIndex = zIndex;
            this.opened = true;
        }
    }
}
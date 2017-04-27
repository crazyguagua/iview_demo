import PopupManager from './popUpManager'
import {merge,getDom} from './uiTool'

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
        zIndex:{}//z-index 属性
    },
    watch:{
        value(val){
            if(val){
                this.open();
            }else{
                this.close();
            }
        }
    },
    data(){
        return {
            opended:false,//弹出框是否已经打开
            seedId:1 //弹出框种子Id
        }
    },
    beforeMount(){
        this.popupId = `popUp-${this.seedId}`;
        console.log(this.popupId);
        PopupManager.register(this.popupId,this);//注册到popUp管理器
        // console.log('beforemount');
    },
    destory(){
        console.log('destroy');
    },
    beforeDestroy(){
        // console.log('beforeDestroy');
    },
    methods:{
        open(options){
            
            //this.$props 这个取不到 ，只能取整个组件的属性
            const props = merge({}, (this.$props || this), options);
           this.handleOpen(props);
        },
        handleOpen(props){
           
            this.visible = true;
            this.$emit('input',true);
            //dom
            let dom = getDom(this.$el);
            const modal = props.modal;
            let zIndex = props.zIndex;
           
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
            dom.style.zIndex = zIndex;
            this.opened = true;
        },
        close(){
           this.doClose();
        },
        doClose(){
            this.visible = false;
            this.opened = false;
            this.$emit('input',false);
        }
    }
}
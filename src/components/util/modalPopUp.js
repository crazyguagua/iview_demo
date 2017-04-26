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
        modelCls:String, //弹出框遮罩的样式
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
            console.log(props);
           this.handleOpen(props);
        },
        handleOpen(props){
            this.visible = true;
            this.$emit('input',true);
            //dom
            let dom = getDom(this.$el);
            const modal = props.modal;
            let zIndex = props.zIndex;
            if(!zIndex){
                zIndex = PopupManager.nextZIndex();
            }
            //modal
            if(modal){
                console.log('模态框');
                popupId.openModal(this.popupId,zIndex);
            }
            if(getComputedStyle(dom).position=='static'){
                dom.style.position = 'absolute';
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
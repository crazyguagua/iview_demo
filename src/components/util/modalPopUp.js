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
            opended:false//弹出框是否已经打开
        }
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

            }
            debugger;
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
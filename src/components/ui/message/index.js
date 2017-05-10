import Vue from 'vue';
import notification from '../notification';

const notificationKey = 'notification-message';
let seed = 0;
let Message ={
    conifgProp:{
        styles:{
            top:'50px'
        },
        duration:1
    },
    getInstance(){
        this.instance = this.instance||notification.newInstance(
        {
                prefix:'my-message',
                styles:{
                    top:'60px'
                }
         });
        return this.instance;
    },
    instance:null,
    iconClsMap:{
        'success':'icon-iconok01 success',
        'info':'icon-info info',
        'warning':'icon-warning warning',
        'error':'icon-Error error',
        'loading':''
    },
    showMessage(type,content, duration, onClose){
        let instance = this.getInstance();
        instance.add({
            styles:this.conifgProp.styles,
            message:content,
            iconCls:this.iconClsMap[type],
            name:`${notificationKey}-${seed}`,
            content: `<div class="my-message-custom-content">
                         <i class="iconfont ${this.iconClsMap[type]}"  ></i>
                        <span>
                            ${content}
                        </span>
                    </div>`,
            duration:duration!=undefined?duration:this.conifgProp.duration
        });
        
    },
    info(content, duration, onClose){
        this.showMessage('info',content, duration, onClose);
    },
    success(content, duration, onClose){
         this.showMessage('success',content, duration, onClose);
    },
    warning(content, duration, onClose){
         this.showMessage('warning',content, duration, onClose);
    },
    error(content, duration, onClose){
         this.showMessage('error',content, duration, onClose);
    },
    loading(content, duration, onClose){
         this.showMessage('loading',content, duration, onClose);
    },

    //配置top值和消失延迟时间
    config(prop){
        if(prop.top)this.conifgProp.styles.top = prop.top+'px';
        if(prop.duration)this.conifgProp.duration = prop.duration;
    }
};
Vue.prototype.$Message=Message;

export default Message;
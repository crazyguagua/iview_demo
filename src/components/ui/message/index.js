import Vue from 'vue';
import notification from '../notification';
let Message ={
    getInstance(){
        let instance = this.instance||notification.newInstance({
            prefix:'my-message'
        });
        return instance;
    },
    instance:null,
    iconClsMap:{
        'success':'',
        'info':'',
        'success':'',
        'warning':'',
        'error':'',
        'loading':''
    },
    showMessage(type,content, duration, onClose){
        let instance = this.getInstance();
        instance.add({
            message:content,
            iconCls:this.iconClsMap[type]
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
    }
};
Vue.prototype.$Message=Message;

export default Message;
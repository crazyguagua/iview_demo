import Vue from 'vue'
let hasModal = false;

let instances = {};
let getModalDom = function () {
    if (popManager.modalDom) {
        return popManager.modalDom;
    } else {
        let modalDom = document.createElement('div');
        popManager.modalDom = modalDom;
    }
    return popManager.modalDom;
}
import { addClass, removeClass } from './uiTool'
const popManager = {
    zIndex: 2000,
    nextZIndex() {
        return this.zIndex++;
    },
    modalDom: null,
    getInstance(id) {
        return instances[id];
    },
    modalStack: [],//modal堆栈
    pops: {},
    //绑定popUpId 和组件
    register(popUpId, component) {
        if (!popUpId || !component) return;
        this.pops[popUpId] = component;
    },
    //解除popUpId 和组件
    deregister(id){
        if(id){
            this.pops[id] = null;
            delete this.pops[id];
        }
    },

    /** 开启模态框
     * @param  {string} id  popup id
     * @param  {string} zIndex zIndex
     * @param  {dom} parent   popUp插入位置
     * @param  {array} modalCls popUp 额外的样式
     * @param  {boolean} modalFade  modal是否加入淡入淡出效果
     */
    openModal(id, zIndex, parent, modalCls, modalFade) {
        let modalDom = getModalDom();
        //添加modal-mask 样式
        addClass(modalDom, 'modal-mask');
        //判断堆栈中是否存在 popupId
        for (let i = 0; i < this.modalStack.length; i++) {
            if (modalStack[i].id == id) {
                return;
            }
        }
        //处理modalClass
        if (modalCls) {
            let classArr = modalCls.trim().split(/\s+/);
            classArr.forEach(item => addClass(modalDom, item));
        }
        //判断是否需要给遮罩添加淡入淡出的动画
        if (modalFade) {
            addClass(modalDom, 'modal-mask-enter');
            setTimeout(function () {
                removeClass(modalDom, 'modal-mask-enter');
            }, 200)
        }

        //如果没有指定modalDom插入的位置，则插入到body
        if (parent && parent.parentNode && parent.parentNode.nodeType !== 11) {
            parent.appendChild(modalDom);
        } else {
            document.body.appendChild(modalDom);
        }

        if (zIndex) {
            modalDom.style.zIndex = zIndex;
        }
        modalDom.style.display = '';

        this.modalStack.push({ id: id, zIndex: zIndex, modalCls: modalCls, modalFade: modalFade })
    },

    /**
     *  关闭模态框
     * @param  {String} id
     */
    closeModal(id) {
        //需要判断当前的modal是否是最上层的modal，如果是的话，要去掉modal上的可能出现的modalCls
        let modalDom = getModalDom(); // 得到遮罩的元素
        let modalFade = false;
        if (this.modalStack.length > 0) {
            var topModal = this.modalStack[this.modalStack.length - 1];

            if (topModal.id === id) {
                //当前需要close的modal是最上层
                if (topModal.modalCls) {
                    let cls = topModal.modalCls.split(/\s+/);
                    cls.forEach(item => removeClass(modalDom, item))
                }
                //弹出最上层的modal
                this.modalStack.pop();
                //修改modal的zIndex为当前最上面的modal的zIndex
                modalFade = topModal.modalFade;
                if (this.modalStack.length > 0) {
                    this.modalDom.style.zIndex = this.modalStack[this.modalStack.length - 1].zIndex
                }

            } else {
                for (var i = this.modalStack.length - 1; i >= 0; i--) {
                    if (this.modalStack[i].id === id) {
                        modalFade = this.modalStack[i].modalFade;
                        this.modalStack.splice(i, 1);
                        break;
                    }
                }
            }

            //如果此时modalStack的长度为0了，就需要把modalDom元素从body上移除
            if (this.modalStack.length === 0) {
                //判断是否有淡入淡出效果
                if (modalFade) {
                    addClass(modalDom, 'modal-mask-leave');
                }
                setTimeout(() => {
                    if(modalDom.parentNode)modalDom.parentNode.removeChild(modalDom);
                    modalDom.style.display='none';
                    popManager.modalDom=undefined;
                    removeClass(modalDom, 'modal-mask-leave');

                }, 200)

            }
        }
    }

}
//处理esc按下的情况
window.addEventListener('keyup',function(event){
    if(event.keyCode === 27 ){ //press esc
        if(popManager.modalStack.length>0){
            let pop = popManager.modalStack[popManager.modalStack.length-1];
            if(pop&& popManager.pops[pop.id]){
                //找出最上面的modal modal的id对应的modal组件实例，并调用实例的关闭方法
                popManager.pops[pop.id].close();
            }
        }
    }
})
export default popManager;
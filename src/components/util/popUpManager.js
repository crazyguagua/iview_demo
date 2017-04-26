import Vue from 'vue'
let hasModal = false;

let instances ={};
let getModalDom = function(){
    if(popManager.modalDom){
        return modalDom;
    }else{
        let modalDom = document.createElement('div');
        popManager.modalDom = modalDom;
    }
    return popManager.modalDom;
}
const popManager={
    zIndex:2000,
    nextZIndex(){
      return this.zIndex++;  
    },
    modalDom:null,
    getInstance(id){
        return instances[id];
    },
    modalStack:[],//modal堆栈
    pops:{},
    //绑定popUpId 和组件
    register(popUpId,component){
        if(!popUpId ||!component)return;
        this.pops[popUpId] = component;
    },
    
    /**
     * @param  {string} id  popup id
     * @param  {string} zIndex zIndex
     * @param  {dom} parent   popUp插入位置
     * @param  {array} modalCls popUp 额外的样式
     * @param  {boolean} fade  modal是否加入淡入淡出效果
     */
    openModal(id,zIndex,parent,modalCls,fade){
        let modalDom = getModalDom();

        debugger;
        //判断堆栈中是否存在 popupId
        for(let i=0;i<this.modalStack.length;i++){
            if(modalStack[i].id == id){
                return;
            }
        }

        //处理modalClass
        if (modalClass) {
            let classArr = modalClass.trim().split(/\s+/);
            classArr.forEach(item => addClass(modalDom, item));
        }
        
        //如果没有指定modalDom插入的位置，则插入到body
        if(parent&& parent.parentNode && parent.parentNode.nodeType !== 11){
            parent.appendChild(modalDom);
        }else{
            document.body.appendChild(modalDom);
        }

        if(zIndex){
            modalDom.style.zIndex = zIndex;
        }
        modalDom.style.display='';

        this.modalStack.push({id:id,zIndex:zIndex,modalClass:modalClass})
    }

}

export default popManager;
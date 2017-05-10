import container from './container';
import Vue from 'vue';
export default{
    newInstance(properties){
        let _props = properties||{};
        let _prop='';
        Object.keys(_props).forEach(prop=>{
            //最好是驼峰转成 -分割
            _prop+=`:${prop}="${prop}" `
        })
        let div = document.createElement('div');
        document.body.appendChild(div);
        //属性 写在${_prop}里面，data里面放属性对应的数据
        let notification = new Vue({
            el:div,
            data:_props, //obj
            template:`<container ${_prop}></container>`,
            components:{
                container
            }
        }).$children[0]; //$children[0] 才是 container组件的实例

        return {
            add(notice){
                //实例才有方法， container 构造器并没有方法，所以是  notification.addNotice(notice) 而不是 container.addNotice(notice)
                notification.addNotice(notice)
            },
            remove(){

            },
            destroy(){

            },
            component:notification
        };
    }

}
import container from './container';
console.log(container);
import Vue from 'vue';
export default{
    newInstance(properties){
        let _props = properties||{};
        let _prop='';
        Object.keys(_props).forEach(prop=>{
            //TODO 最好是驼峰转横杠分割
            let val =_props[prop];
            _prop+=`${prop}=${val} `
        })
        let div = document.createElement('div');
        document.body.appendChild(div);
        let notification = new Vue({
            el:div,
            data:{},
            template:`<container ${_prop}></container>`,
            components:{
                container
            }
        })

        return {
            add(notice){
                debugger;
                container.add(notice)
            },
            remove(){

            },
            destroy(){

            },
            component:notification
        };
    }

}
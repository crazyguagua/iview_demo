<template>
    <div :class="classes">
        <p class="menu-title">{{menuTitle}}</p>
        <ul class="menu-list" >
            <slot name="menuList"></slot>
            
        </ul>
    </div>
</template>
<script>
const prefixCls = 'menu';
import {oneOf} from '../../util/uiTool';
    export default{
        props:{
            menuTitle:{
                type:String,
                default:'导航菜单'
            },
            theme:{
                validator(value){
                    return oneOf(value, ['light', 'dark']);
                },
                default:'light'
            }
        },
        data(){
            return{
              
            }
        },
        computed:{
            classes(){
                let theme = this.theme;
                return [
                    `${prefixCls}-${theme}`
                ];
            }
        }

    }
</script>
<style >
    .menu-title {
        color: #7a7a7a;;
        font-size: 11px;
        letter-spacing: 1px;
        text-transform: uppercase;
        padding:10px;
    }
    .menu-dark{
        background: #313540;;
    }
    .menu-light{
        background: #fff;
    }
</style>
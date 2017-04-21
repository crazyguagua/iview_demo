<template>
    <li class="select-dropdown-item" @mouseenter="hoverOption" :class="{'hover':parent.hoverIndex === index}"
    @click.stop="selectOption">
        <span>{{label}}</span>
    </li>

</template>
<script>
    import Emitter from '../../mixins/emitter'
    export default{
        name:'myOption',
        mixins:[Emitter],
        componentName:'myOption',
        props:{
            value:[String,Number,Boolean],
            label:[String,Number],
            disabled:{
                type:Boolean,
                default:false
            }//该option是否可用
        },
        data(){
            return{
              index:-1//当前option在select组件options中的索引
            }
        },
        methods:{
            hoverOption(){
               if(!this.disabled){
                  this.parent.hoverIndex = this.index
               }
            },
            selectOption(){
                if(!this.disabled){
                    //事件通知对象   事件名 this
                    this.dispatch('mySelect','optionClicked',this)
                }
            }
        },
        computed:{
            parent(){
                //向上找到select组件
                let p =  this.$parent;
                while(p.$options.componentName!=='mySelect'){
                    p = p.$parent;
                }
                return p;
            }
        },
        mounted(){
            //父组件options数组push当前元素
            this.parent.options.push(this);
            this.index = this.parent.options.indexOf(this) //当前option的索引
        }
    }
</script>
<style lang="less">
    .select-dropdown-item{
        font-size:14px;
        padding:8px 10px;
        position: relative;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #48576a;
        height: 36px;
        line-height: 1.5;
        box-sizing: border-box;
        cursor: pointer;
        & span{
            line-height:1.5;
        }
        &.hover{
            background-color: #e4e8f1;
        }
    }
</style>
<template>
    <li class="select-dropdown-item" @mouseenter="hoverOption">
        <span>{{label}}</span>
    </li>

</template>
<script>
    export default{
        name:'myOption',
        componentName:'myOption',
        props:{
            value:[String,Number,Boolean],
            label:[String,Number]
        },
        methods:{
            hoverOption(){

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
    }
</style>
<template>
    <li class="select-dropdown-item" @mouseenter="hoverOption">
        <span>{{label}}</span>
    </li>

</template>
<script>
    export default{

        props:{
            value:[String,Number,Boolean],
            label:[String,Number]
        },
        methods:{
            hoverOption(){

            }
        },
        mounted(){
            //父组件options数组push当前元素
            debugger;
            this.$parent.options.push(this);
            this.index = this.$parent.options.indexOf(this) //当前option的索引
        }
    }
</script>
<style lang="less">
    .select-dropdown-item{
        font-size:14px;
        padding:8px 10px;
        & span{
            line-height:1.5;
        }
    }
</style>
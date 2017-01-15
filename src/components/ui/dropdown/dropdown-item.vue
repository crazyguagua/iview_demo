<template>
    <li class="my-dropdown-item" @click="itemClick"><a href="javascript:void(0)"><i :class="icon" class="iconfont" ></i><span>{{text}}</span></a></li>
</template>
<script>
    export default {
        props: {
            text: String,
            icon: String,
            clickKey:[String,Number]
        },
        methods:{
            itemClick:function(){
                debugger;
                var parent = this.$parent.$parent;
                parent.$emit('dropdown-item-click',this.clickKey);
            }
        }
    }
</script>
<style lang="less">
    .my-dropdown-item {
        margin: 0;
        padding: 2px 16px;
        color: #657180;
        font-size: 12px!important;
        cursor: pointer;
        & span {
            padding: 0 10px;
            vertical-align: middle;
            position: relative;
            top: -3px;
        }
    }
</style>
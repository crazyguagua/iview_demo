<template>
    <li class="my-dropdown-item" @click="click"><a href="javascript:void(0)"><i :class="icon" class="iconfont" ></i><span>{{text}}</span></a></li>
</template>
<script>
    export default {
        props: {
            text: String,
            icon: String,
            clickKey: [String, Number],
            click: {
                type: Function
            }
        },
        methods: {
            // itemClick:function(){
            //     debugger;
            //     var parent = this.$parent.$parent;
            //     parent.$emit('dropdown-item-click',this.clickKey);
            // }
        }
    }
</script>
<style lang="less">
    .my-dropdown-item {
        margin: 0;
        padding: 2px 16px;
        font-size: 12px!important;
        cursor: pointer;
        & a {
            color: #fff;
            &:hover {
                color: #b0eaa6;
            }
        }
        & span {
            padding: 0 10px;
            vertical-align: middle;
            position: relative;
            top: -3px;
        }
    }
</style>
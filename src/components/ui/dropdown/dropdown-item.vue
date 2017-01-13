<template>
    <li class="my-dropdown-item"><a href="javascript:void(0)"><i :class="icon" class="iconfont"></i><span>{{text}}</span></a></li>
</template>
<script>
    export default {
        props: {
            text: String,
            icon: String
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
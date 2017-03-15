<template>
    <div class="right-content">
        <router-view></router-view>
    </div>
</template>
<script>
</script>
<style lang="less">
    .right-content {
        position: absolute;
        bottom: 0;
        right: 0;
        left: 200px;
        top: 55px;
        background: #fff;
        & .content-header {
            position: relative;
            padding: 12px 30px;
            background-color: #fff;
            border-bottom: 1px solid #e1e6ef;
        }
    }
</style>
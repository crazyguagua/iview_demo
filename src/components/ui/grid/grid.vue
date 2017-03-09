<template>
    <div class="grid">
        <slot name="toolbar"></slot>
    
    </div>
</template>
<script>
    export default{

    }
</script>
<style lang="less">
        .grid{
            border: 1px solid #c4cbe1;
            -webkit-border-top-left-radius: 2px;
            border-top-left-radius: 2px;
            -webkit-border-top-right-radius: 2px;
            border-top-right-radius: 2px;
        }
</style>
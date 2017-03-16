<template>
    <div class="checkbox-group">
        <slot></slot>
    </div>

</template>
<script>
    export default{
        name:'checkboxGroup',
        props:{
            value:{}
        }
    }
</script>
<style lang="less">
    
</style>

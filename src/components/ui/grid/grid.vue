<template>
    <div :class="wrapperCls">
        <slot name="toolbar"></slot>
    
    </div>
</template>
<script>
    const  prefix= 'grid'
    export default{
        props:{
            data:{
                type:Array
            }
        },
        computed:{
            wrapperCls(){
                return [
                     `${prefix}-wrapper`,
                ]
            }
        }
    }
</script>
<style lang="less">
        .grid-wrapper{
            border: 1px solid #c4cbe1;
            -webkit-border-top-left-radius: 2px;
            border-top-left-radius: 2px;
            -webkit-border-top-right-radius: 2px;
            border-top-right-radius: 2px;
        }
</style>
<template>
    <div :class="classes">
        <slot></slot>
    </div>
</template>
<script>
    const prefix = 'my-form'
    export default{
         props:{

        },
        data(){
            return {

            }
        },
        computed:{
            classes(){
                return [`${prefix}`];
            }
        }
    }
</script>
<style lang="less">
    
</style>

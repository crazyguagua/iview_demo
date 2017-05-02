<template>
    <div :class="classes">
        <slot></slot>
    </div>
</template>
<script>
    const prefix = 'my-form'
    export default{
        name:'myForm',
         props:{
             labelWidth:{//label 的宽度
                 type:Number
             }
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

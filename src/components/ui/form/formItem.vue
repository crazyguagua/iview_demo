<template>
    <div :classe="classes">
        <slot></slot>
    </div>
</template>
<script>
    const prefix = 'my-form-item';
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


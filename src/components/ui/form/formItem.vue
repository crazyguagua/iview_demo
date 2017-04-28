<template>
    <div :classe="classes">
    
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


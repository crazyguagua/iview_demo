<template>
    <div>
        <div>
            <i></i>
            <span>
                {{message}}
            </span>
        </div>
    </div>
</template>
<script>
    export default{
        props:{
            message:String,
            iconCls:String
        },
        computed:{

        }
    }
</script>
<style lang="less">
    
</style>
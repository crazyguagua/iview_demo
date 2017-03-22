<template>
        <ul :class="ulCls">
            <li v-for="num in total">{{num}}</li>
        </ul>
</template>
<script>
    const prefix='myPage'
    export default{
        name:'page',
        componentName:'page',
        props:{
            total:Number
        },
        computed:{
            ulCls(){
                return [`${prefix} clearfix`]
            }
        }
    }
</script>
<style lang="less">
    .myPage{
        & li{
            float:left;
        }
    }
</style>
<template>
    <label :class="labelCls">
        <span :class="radioCls">
            <span :class="innerCls"></span>
            <input type="radio" :class="inputCls">
        </span>
        <slot></slot>
    </label>


</template>

<script>
     const prefix ='my-radio';
     export default{
            
            computed:{
                labelCls(){
                    return [`${prefix}-wraper`]
                },
                radioCls(){
                    return [`${prefix}`]
                },
                innerCls(){
                    return [`${prefix}-inner`]
                },
                inputCls(){
                    return [`${prefix}-input`]
                }
            }

     }
</script>

<style lang="less">
    
</style>
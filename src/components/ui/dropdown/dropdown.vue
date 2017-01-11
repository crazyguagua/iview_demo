<template>
    <div>
        <div @click="handleClick"><slot ></slot></div>
        <div v-show="hasClick==true">
            <slot name="list"></slot>
        </div>
    </div>
</template>
<script>
    export default {
        methods: {
            handleClick: function() {

            }
        },
        data: function() {
            return {
                hasClick: false
            }
        }
    }
</script>
<style lang="less">

</style>
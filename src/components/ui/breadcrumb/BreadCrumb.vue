<template>
     <ol :class="classes">
        <slot></slot>
    </ol>   
</template>
<script>
    const prefixCls = 'my-breadcrumb'
    export default {
        name: 'MyBreadcrumb',
        props: {
            separator: {
                type: String,
                default: '/'
            }
        },
        computed: {
            classes() {
                return `${prefixCls}`
            }
        },
        data() {
            return {

            }
        }
    }
</script>
<style lang="less">
    .my-breadcrumb {
        float: right;
        background: #fff;
        margin-top: 0;
        margin-bottom: 0;
        font-size: 12px;
        padding: 7px;
        position: absolute;
        bottom: 10px;
        right: 30px;
        border-radius: 0;
        border: 1px solid #e1e6ef;
        font-weight: 600;
    }
</style>
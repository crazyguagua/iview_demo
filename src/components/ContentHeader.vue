<template>
     <div class="content-header">
            <div class="header-title">
                <h1>{{title}}</h1>
                <small></small>
                <slot name="breadcrumb"></slot>
            </div>
            
    </div>
</template>
<script>
    export default {
        props: {
            title: {
                type: String
            },

        }
    }
</script>
<style lang="less">
    .content-header .header-title h1 {
        margin: 0;
        font-size: 18px;
    }
</style>
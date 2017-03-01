<template>
    <li class="menu-header menu-item"><a href="" @click="goMenu(route)"><span><i></i></span>{{title}}</a></li>
</template>
<script>
    export default {
        props: {
            title: {
                type: String
            },
            path: {
                type: String
            }
        },
        methods: {
            goMenu: function(route) {
                debugger;
                this.router.push(route)
            }
        }
    }
</script>
<style lang="less">
    .menu-header.menu-item {
        padding-left: 43px;
    }
    
    .menu-dark .menu-item,
    .menu-dark .menu-item a {
        color: #9ea7b4;
    }
    
    .menu-dark .menu-item a:hover {
        color: #fff;
    }
</style>
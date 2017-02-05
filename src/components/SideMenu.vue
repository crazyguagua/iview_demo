<template>
    <div class="nav-menu "> 
        <NavMenu>
            <MenuItem>
            </MenuItem>
        </NavMenu>
    </div>
</template>
<script>
    import {
        NavMenu,
        MenuItem} from './ui/menu'
    export default{
        components:{
            NavMenu,
            MenuItem
        }
    }
</script>
<style lang="" scoped>
    .nav-menu {
        position: fixed;
        top: 55px;
        bottom: 0;
        width:200px;
        background: #fff;
        box-shadow: 0 2px 3px hsla(0,0%,7%,.1),0 0 0 1px hsla(0,0%,7%,.1);
        overflow-y: auto;
        overflow-x: hidden;
    }
</style>
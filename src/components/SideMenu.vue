<template>
    <div class="nav-menu "> 
        <NavMenu>
            <NavMenuItem>
            </NavMenuItem>
        </NavMenu>
    </div>
</template>
<script>
    import {
        NavMenu,
        NavMenuItem} from './ui/menu'
    console.log(NavMenu);
    export default{
        components:{
            NavMenu,
            NavMenuItem
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
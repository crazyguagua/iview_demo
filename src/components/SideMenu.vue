<template>
    <div class="nav-menu "> 
        <NavMenu theme="dark">
          <MenuGroup v-for="menu in loginMenu" :hasChild="menu.child && menu.child.length>0" :path="menu.url" slot="menuList" :title="menu.name" :collapsed='menu.collapsed'>
                <NavMenuItem  v-for="sub in menu.child" v-if="menu.child" :title="sub.name" :path="sub.url"></NavMenuItem>
          </MenuGroup>
        </NavMenu>
    </div>
</template>
<script>
import {mapGetters,mapState} from 'vuex';
    import {
        NavMenu,
        NavMenuItem,
        MenuGroup
    } from './ui/menu'
    export default {
        components: {
            NavMenu,
            NavMenuItem,
            MenuGroup
        },
        computed:{
            ...mapGetters([
                 'loginMenu',
                ]),
        },
        data() {
            return {
                // menus: [{
                //     title: '我的工作台',
                //     path: '/dashboard'
                // }, {
                //     title: '系统管理',
                //     collapsed: false,
                //     subMenu: [{
                //         title: '用户管理',
                //         path: '/userManage'
                //     }, {
                //         title: '角色管理',
                //         path: 'role/list'
                //     }, {
                //         title: '菜单管理',
                //         path: 'role/list'
                //     }]

                // }, {
                //     title: '统计分析',
                //     subMenu: [{
                //         title: '用户留存',
                //         path: 'user/list'
                //     }, {
                //         title: '流失用户',
                //         path: 'role/list'
                //     }]

                // }]
            }
        }
    }
</script>
<style lang="" scoped>
    .nav-menu {
        position: fixed;
        top: 55px;
        bottom: 0;
        width: 200px;
        background: #313540;
        box-shadow: 0 2px 3px hsla(0, 0%, 7%, .1), 0 0 0 1px hsla(0, 0%, 7%, .1);
        overflow-y: auto;
        overflow-x: hidden;
    }
</style>
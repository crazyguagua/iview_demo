<template>
    <div class="nav-menu "> 
        <NavMenu theme="dark">
          <MenuGroup v-for="menu in menus" slot="menuList" :title="menu.title" :collapsed='menu.collapsed'>
                <NavMenuItem v-for="sub in menu.subMenu" v-if="menu.subMenu" :title="sub.title" :path="sub.path"></NavMenuItem>
            </MenuGroup>
        </NavMenu>
    </div>
</template>
<script>
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
        data() {
            return {
                menus: [{
                    title: '系统管理',
                    collapsed: false,
                    subMenu: [{
                        title: '用户管理',
                        url: '/home/userManage'
                    }, {
                        title: '角色管理',
                        url: 'role/list'
                    }, {
                        title: '菜单管理',
                        url: 'role/list'
                    }]

                }, {
                    title: '统计分析',
                    subMenu: [{
                        title: '用户留存',
                        url: 'user/list'
                    }, {
                        title: '流失用户',
                        url: 'role/list'
                    }]

                }]
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
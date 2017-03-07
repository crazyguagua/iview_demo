<template>
    <div class="nav-menu "> 
        <NavMenu theme="dark">
          <MenuGroup v-for="menu in menus" :hasChild="menu.subMenu && menu.subMenu.length>0" :path="menu.path" slot="menuList" :title="menu.title" :collapsed='menu.collapsed'>
                <NavMenuItem  v-for="sub in menu.subMenu" v-if="menu.subMenu" :title="sub.title" :path="sub.path"></NavMenuItem>
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
                    title: '我的工作台',
                    path: '/dashboard'
                }, {
                    title: '系统管理',
                    collapsed: false,
                    subMenu: [{
                        title: '用户管理',
                        path: '/userManage'
                    }, {
                        title: '角色管理',
                        path: 'role/list'
                    }, {
                        title: '菜单管理',
                        path: 'role/list'
                    }]

                }, {
                    title: '统计分析',
                    subMenu: [{
                        title: '用户留存',
                        path: 'user/list'
                    }, {
                        title: '流失用户',
                        path: 'role/list'
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
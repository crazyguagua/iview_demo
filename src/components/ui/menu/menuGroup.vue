<template>
    <li>
        <div class="menu-header menu-title" v-on:click="toggle()">
            <i class="" ></i>
                {{title}}
            <i v-if="hasChild" class="iconfont collapse" :class="[collapsed ? 'icon-arrow_down':'icon-arrow_up']" ></i>
        </div>
        
        <ul  class="subMenu"  :class="[collapsed?'collapsed':'']">
            <slot ></slot>
        </ul>
    </li>
</template>
<script>
    export default {
        props: {
            title: {
                type: String
            },
            icon: {
                type: String
            },
            hasChild: {
                type: Boolean,
                default: false
            },
            path: {
                type: String
            },
            isCollapsed: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                collapsed: this.isCollapsed ? this.isCollapsed : true
            }
        },
        computed: {
            arrowClasses() {


            },

        },
        methods: {
            toggle() {
                if (!this.hasChild && this.path) {
                    this.$router.push(this.path);
                } else {
                    this.collapsed = !this.collapsed;
                }

            }
        }
    }
</script>
<style lang="less">
    .menu-header {
        padding: 14px 24px;
        cursor: pointer;
        position: relative;
        & .collapse {
            position: absolute;
            right: 10px;
            top: 12px;
        }
        &>i {
            margin-right: 8px;
        }
    }
    
    .menu-light {
        & .menu-header:hover {
            background: #f3f3f3;
        }
    }
    
    .menu-dark {
        & .menu-header {
            color: #9ea7b4;
            position: relative;
        }
        & .menu-header.menu-title {
            background: #464c5b;
        }
        & .menu-header:hover {
            color: #fff;
        }
    }
    
    .subMenu {
        transition: all .3s;
        overflow: hidden;
        height: auto;
        &.collapsed {
            height: 0;
        }
    }
</style>
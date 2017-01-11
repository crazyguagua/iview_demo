<template>
    <div class="nav-bar-header clearfix" :class="headerCls">
        <div class="sys-info">
            <a class="brand">
                <i class="iconfont" :class="logoCls"></i>
                <span class="sys-name">{{sysName}}</span>
            </a>
        </div>
        <div class="nav-header-btns clearfix">
            <ul class="nav clearfix">
                <li class="user-li"><i class="iconfont avatar"></i><span class="user-info"><small>欢迎你，</small>zhangxiaodong</span>
               <div class="dropdown-div">
                   <dropdown>
                        <a href="javascript:void(0)"><i class="iconfont arrow-down"></i></a>
                        <dropdown-menu slot="list">
                            <dropdown-item></dropdown-item>
                            <dropdown-item></dropdown-item>
                            <dropdown-item></dropdown-item>
                        </dropdown-menu>
                    </dropdown>
                    
               </div>
                </li>
                <li class="menu-li" style="margin-right:20px;"><i></i><span>业务系统</span></li>
                <li class="menu-li"><i></i><span>监控系统</span></li>
                <li  class="menu-li"><i></i><span>报表系统</span></li>
            </ul>
        </div>
    </div>
</template>
<script>
    import  dropdown from './ui/dropdown/dropdown';
    console.log(dropdown);
    export default {
        props: {
            theme: {
                type: String,
                default: 'ace'
            },
            sysName: {
                type: String
            },
            logo: {
                type: String
            }
        },
        components: {
            dropdown
        },
        computed: {
            headerCls() {
                return this.theme;
            },
            logoCls() {
                return this.logo || 'logo-1';
            }
        }
    }
</script>

<style lang="less">
    .nav-bar-header {
        min-height: 45px;
        &.ace {
            background: #438EB9;
            padding: 5px 0 ;
        }
        & .sys-info {
            line-height: 1.5;
            float: left;
            & .brand {
                font-size: 22px;
                color: #fff;
                padding: 5px 20px;
            }
        }
    }
    
    .nav-header-btns {
        float: right;
        height: 45px;
        & .nav {
            height: 45px;
            color: #fff;
            & .dropdown-div {
                display: inline-block;
            }
            & .user-li{
                float:right;
            }
            & .menu-li {
                float: right;
                line-height: 45px;
                height: 45px;
                border-left: 1px solid #E1E1E1;
                padding: 0;
                position: relative;
                background-color: #555;
                padding:0 10px;
            }
            & .menu-li:last-child {
                border-width: 0;
            }
            & .menu-li:first-of-type{
                margin-right:10px;
            }
            & .user-li i {
                position: relative;
                top: -20px;
                right: 5px;
                color: #ccc;
            }
            & .user-info {
                min-width: 100px;
                display: inline-block;
                overflow: hidden;
                text-overflow: ellipsis;
                & small {
                    font-size: 18px;
                    display: block;
                }
            }
        }
    }
</style>
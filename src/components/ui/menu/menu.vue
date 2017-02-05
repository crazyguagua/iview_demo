<template>
    <div >
        <p class="menu-title">{{menuTitle}}</p>
        <ul class="menu-list">
            <slot name="menuList"></slot>
        </ul>
    </div>
</template>
<script>
    export default{
        props:{
            menuTitle:{
                type:String,
                default:'导航菜单'
            }
        },
        data(){
            return{
               
            }
        }

    }
</script>
<style >
    .menu-title {
        color: #7a7a7a;;
        font-size: 11px;
        letter-spacing: 1px;
        margin-bottom: 5px;
        text-transform: uppercase;
        padding:10px;
    }
</style>
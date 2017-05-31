<template>
    <div class="reg-body">
        <login-header></login-header>
        <div class="reg-content">
           <router-view></router-view>
        </div>
         
    </div>
</template>

<script>
    import loginHeader from '../../components/LoginHeader';
    import {BreadCrumb,BreadCrumbItem} from '../../components/ui/breadcrumb';
    export default{
        name:'reg',
        components:{
            loginHeader,
            BreadCrumb,BreadCrumbItem
        }
    }
</script>
<style lang="less" >
    body{
        background: linear-gradient(#56657D, #798EB1);
    }
    .reg-body{
        // background: linear-gradient(#56657D, #798EB1);
        // position:absolute;
        // top:0;
        // right:0;
        // left:0;
        // bottom:0;
    }
    .reg-content{
        width:500px;
        // position: absolute;
        // top: 55px;
        // left: 50%;
        // right: 50%;
        // margin-left: -250px;
        background: #fff;
        margin:0px auto;
    }
    .breadcrumb-wrapper{
        position:relative;
        padding:20px;
        border-bottom: 1px solid #dee5e7;
    }
    .choose-type{
        padding:10px 20px;
        .image-boxes{
            margin:200px 0;
        }
        .image-box{
            float:left;
            width:50%;
            text-align:center;
            img{
                cursor:pointer;
            }
        }
    }
</style>
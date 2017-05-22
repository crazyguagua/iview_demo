<template>
    <div class="nav-header clearfix">
        <a href="/" class="logo"><img src="../assets/images/Logo_45.png" alt="" ></a>
        <h1 class="sysName"><span >{{sysName}}</span></h1>
        <div class="right-btns">
            <router-link to="reg/select"><el-button :type="regType">注册</el-button></router-link>
            <router-link to="audit"><el-button :type="auditType">查询审核进度</el-button></router-link>
            <router-link to="help"> <el-button :type="helpType">帮助</el-button></router-link>
            
           
        </div>
    </div>

</template>

<script>
    export default{
        name:'loginHeader',
        props:{
            activeButton:{
                type:String,
                default:'reg'
            }
        },
        data(){
            return {
                sysName:'智能救援平台'
            }
        },
        computed:{
            regType(){
                return this.activeButton === 'reg'?'primary':'default'
            },
             auditType(){
                return this.activeButton === 'audit'?'primary':'default'
            },
             helpType(){
                return this.activeButton === 'help'?'primary':'default'
            }
        }
    }
</script>
<style lang="less" scoped>
    .nav-header{
        // position:absolute;
        // top:0;
        // left:0;
        width:100%;
        background:#798eb1;
        height:55px;
        line-height:55px;
        z-index:1000;
        .sysName{
            font-size:20px;
            color:#c5d5da;
            margin-left:20px;
            vertical-align:top;
            float:left;
        }
        .logo{
            display:block;
            height:55px;
            padding:5px;
            float:left;
            box-sizing: border-box;
        }
        .right-btns{
            float:right;
            margin-right:10px;
        }
    }
    
</style>